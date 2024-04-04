# In cart/admin.py

from django.contrib import admin
from .models import Cart, CartItem, DeliveryInformation

admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(DeliveryInformation)
