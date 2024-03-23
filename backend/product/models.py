from django.core.validators import MinValueValidator
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategories')

    def __str__(self):
        return self.name

class PriceUnit(models.Model):
    name = models.CharField(max_length=4, unique=True)

    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):  # Changed from Item to Product
    name = models.CharField(max_length=100)  # Changed from Item to Product
    description = models.TextField()
    categories = models.ManyToManyField(Category, related_name='products')
    unit = models.ForeignKey(Unit, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active_product = models.BooleanField(default=True)  # Changed from Item to Product
    
    def __str__(self):
        return self.name
    
    @property
    def total_quantity(self):
        total_quantity = sum(variation.quantity for variation in self.variations.all()) if self.variations.exists() else 0
        if self.unit:
            return f"{total_quantity} {self.unit.name}"
        else:
            return total_quantity

class Attribute(models.Model):  # Changed from Characteristics to Attribute
    name = models.CharField(max_length=100)  # Changed from Characteristics to Attribute
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class ProductVariation(models.Model):  # Changed from ItemVariation to ProductVariation
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variations')  # Changed from Item to Product
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    attributes = models.ManyToManyField(Attribute, related_name='variations', blank=True)  # Changed from Characteristics to Attribute
    size = models.CharField(max_length=20, blank=True, null=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active_variation = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} - {self.name}"

class Picture(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='pictures')  # Changed from Item to Product
    image = models.ImageField(upload_to='product_pictures')  # Changed from item_pictures to product_pictures
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Picture of {self.product.name}"

class VariationPrice(models.Model):
    variation = models.ForeignKey(ProductVariation, on_delete=models.CASCADE, related_name='prices')  # Changed from ItemVariation to ProductVariation
    price_unit = models.ForeignKey(PriceUnit, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"Price of {self.variation.product.name} - {self.variation.name} ({self.start_date} - {self.end_date})"
