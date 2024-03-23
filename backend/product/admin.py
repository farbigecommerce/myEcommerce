from django.contrib import admin
from .models import Product, Attribute, ProductVariation, Picture, VariationPrice, Unit, Category, PriceUnit

admin.site.register(Product)
admin.site.register(Attribute)
admin.site.register(ProductVariation)
admin.site.register(Picture)
admin.site.register(VariationPrice)
admin.site.register(Unit)
admin.site.register(Category)
admin.site.register(PriceUnit)
