# In cart/api/views.py

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import CartItemSerializer,CartItemListSerializer
from product.models import ProductVariation, VariationPrice

from datetime import date

class ListCartItems(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(cart__user=request.user, is_deleted=False)
        serializer = CartItemListSerializer(cart_items, many=True)

        # Calculate subtotal
        subtotal = sum(item['total_price'] for item in serializer.data if item['is_selected'])

        # Create a dictionary to hold both cart items and subtotal
        response_data = {
            'cart_items': serializer.data,
            'subtotal': subtotal
        }

        return Response(response_data)

class AddCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def update_quantity(self, cart_item, new_quantity):
        cart_item.quantity = new_quantity
        cart_item.save()

        # Check availability again
        if cart_item.quantity > cart_item.product_variation.quantity:
            cart_item.is_selected = False
            cart_item.save()

    def post(self, request):
        # Retrieve user's cart
        user_cart = request.user.cart

        # Extract data from request
        product_variation_id = request.data.get('product_variation')
        quantity = request.data.get('quantity')
        is_selected = True  # By default

        # Retrieve existing cart item or create a new one
        cart_item = self.get_existing_cart_item(user_cart, product_variation_id)
        if cart_item:
            # If the cart item already exists, update its quantity and check availability again
            new_quantity = cart_item.quantity + int(quantity)
            
            # Check availability
            product_variation = self.get_product_variation(product_variation_id)
            if not self.check_availability(product_variation, int(new_quantity)):
                return Response({'error': 'Product is not available'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                self.update_quantity(cart_item, new_quantity)
                cart_item.is_deleted = False
                cart_item.save()
                serializer = CartItemSerializer(cart_item)
                cart_items = CartItem.objects.filter(cart__user=request.user, is_deleted=False)
                serializer = CartItemListSerializer(cart_items, many=True)

                # Calculate subtotal
                subtotal = sum(item['total_price'] for item in serializer.data if item['is_selected'])

                # Create a dictionary to hold both cart items and subtotal
                response_data = {
                    'cart_items': serializer.data,
                    'subtotal': subtotal
                }

                return Response(response_data)
        
        else:
            # Create a new cart item
            product_variation = self.get_product_variation(product_variation_id)
            if not product_variation:
                return Response({'error': 'Product variation not found'}, status=status.HTTP_404_NOT_FOUND)

            # Check availability
            if not self.check_availability(product_variation, int(quantity)):
                return Response({'error': 'Product is not available'}, status=status.HTTP_400_BAD_REQUEST)

            cart_item_data = {
                'cart': user_cart.id,
                'product_variation': product_variation_id,
                'quantity': quantity,
                'is_selected': is_selected  # Set is_selected based on availability
            }
            serializer = CartItemSerializer(data=cart_item_data)
            if serializer.is_valid():
                serializer.save(cart=user_cart)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def check_availability(self, product_variation, quantity):
        today = date.today()
        available_prices = VariationPrice.objects.filter(variation=product_variation,
                                                         start_date__lte=today,
                                                         end_date__gte=today)
        if available_prices.exists() and product_variation.quantity >= quantity:
            return True
        return False
    
    def get_existing_cart_item(self, user_cart, product_variation_id):
        try:
            return user_cart.cartitem_set.get(product_variation=product_variation_id)
        except CartItem.DoesNotExist:
            return None
    
    def get_product_variation(self, product_variation_id):
        try:
            return ProductVariation.objects.get(id=product_variation_id)
        except ProductVariation.DoesNotExist:
            return None

class UpdateCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Retrieve data from request
        quantity = request.data.get('quantity', cart_item.quantity)
        is_selected = request.data.get('is_selected', cart_item.is_selected)
        
        # Validate quantity and availability
        if quantity != cart_item.quantity:
            if quantity > cart_item.product_variation.quantity:
                return Response({'error': 'Requested quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate is_selected and availability
        if is_selected and not cart_item.is_available():
            return Response({'error': 'Item is not available for selection'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CartItemSerializer(cart_item, data={'quantity': quantity, 'is_selected': is_selected}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCartItem(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            cart_item = CartItem.objects.get(pk=pk)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the cart item belongs to the requesting user
        if cart_item.cart.user != request.user:
            return Response({'error': 'You are not allowed to delete this item'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the cart item is already deleted
        if cart_item.is_deleted:
            return Response({'error': 'Cart item is already deleted'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item.is_deleted = True
        cart_item.quantity = 0
        cart_item.save()
        return Response({'success': 'Cart item deleted'},status=status.HTTP_204_NO_CONTENT)
