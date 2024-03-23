from rest_framework import serializers
from .models import Product, ProductVariation, Picture, VariationPrice, Category, PriceUnit, Attribute
from datetime import date

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id','image']

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','parent']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class PriceUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceUnit
        fields = ['name']

class VariationPriceSerializer(serializers.ModelSerializer):
    price_unit = serializers.StringRelatedField()

    class Meta:
        model = VariationPrice
        fields = ['price_unit', 'price']

    def to_representation(self, instance):
        today = date.today()
        available_prices = instance.variation.prices.filter(start_date__lte=today, end_date__gte=today)
        
        if available_prices.exists():
            # Retrieve the first available price
            available_price = available_prices.first()
            return {
                'price_unit': available_price.price_unit.name,
                'price': available_price.price
            }
        return None

class AttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['name', 'description']  

class ProductVariationSerializer(serializers.ModelSerializer):
    prices = VariationPriceSerializer(many=True)
    quantity = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()
    attributes = AttributeSerializer(many=True)

    class Meta:
        model = ProductVariation
        fields = ["id", "name", "quantity", "attributes", "size", "weight", "prices", "is_available"]

    def get_quantity(self, obj):
        # Get the user from the context (assuming request.user is available)
        user = self.context.get("user")
        if not user.is_authenticated:
            return obj.quantity

        # Check if the user has this variation in their cart
        cart_item = user.cart.cartitem_set.filter(product_variation=obj).first()
        cart_quantity = cart_item.quantity if cart_item else 0

        # Adjust available quantity based on cart quantity
        available_quantity = obj.quantity - cart_quantity

        return available_quantity if available_quantity > 0 else 0

    def get_is_available(self, obj):
        today = date.today()
        available_prices = obj.prices.filter(start_date__lte=today, end_date__gte=today)
        return available_prices.exists() and (self.get_quantity(obj) > 0)

class ProductSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)
    variations = ProductVariationSerializer(many=True)
    categories = CategorySerializer(many=True)

    class Meta:
        model = Product
        fields = ['id','name', 'description', 'categories','pictures', 'variations']
