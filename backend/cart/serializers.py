from rest_framework import serializers
from .models import CartItem
from product.models import Product, ProductVariation, Picture, VariationPrice, Category, PriceUnit, Attribute
from datetime import date


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['image']


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

class ProductSerializer(serializers.ModelSerializer):
    pictures = PictureSerializer(many=True)

    class Meta:
        model = Product
        fields = ['name', 'description','pictures']

class AttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attribute
        fields = ['name', 'description']  # Adjust as needed

class ProductVariationSerializer(serializers.ModelSerializer):
    prices = VariationPriceSerializer(many=True)
    product = ProductSerializer()
    attributes = AttributesSerializer(many=True)

    class Meta:
        model = ProductVariation
        fields = ['name','product', 'quantity','attributes', 'size', 'weight', 'prices']

    quantity = serializers.FloatField() 

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'


class CartItemListSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    product_variation = ProductVariationSerializer()
    availability = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product_variation', 'quantity', 'is_selected', 'total_price', 'availability']

    def get_total_price(self, obj):
        today = date.today()

        # Check if there are available prices for the item variation
        variation_prices = VariationPrice.objects.filter(variation=obj.product_variation,
                                                         start_date__lte=today,
                                                         end_date__gte=today)
        if not variation_prices.exists():
            return 0

        # Find the actual price for the cart item based on today's date
        actual_price = 0
        for price in variation_prices:
            if price.start_date <= today <= price.end_date:
                actual_price = price.price
                break

        if actual_price is not None:
            return obj.quantity * actual_price
        return 0

    def get_availability(self, obj):
        today = date.today()
        variation_prices = VariationPrice.objects.filter(variation=obj.product_variation,
                                                         start_date__lte=today,
                                                         end_date__gte=today)
        if not obj.product_variation.quantity or not variation_prices.exists():
            obj.is_selected = False
            obj.save()
            return False
        return True