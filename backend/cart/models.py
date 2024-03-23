from django.db import models
from accounts.models import CustomUserModel
from django.utils import timezone
from product.models import ProductVariation, VariationPrice


class Cart(models.Model):
    user = models.OneToOneField(CustomUserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart for user {self.user.email}"

    def save(self, *args, **kwargs):
        # Check if a cart already exists for the user
        existing_cart = Cart.objects.filter(user=self.user).first()
        if existing_cart:
            # If a cart already exists, update its timestamp
            existing_cart.save()
            return existing_cart
        else:
            # If no cart exists, proceed with creating a new one
            return super().save(*args, **kwargs)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product_variation = models.ForeignKey(ProductVariation, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_selected = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} of {self.product_variation} in cart for {self.cart}"
    
    def is_available(self):
        today = timezone.now().date()
        # Check if the item variation has available stock
        if self.product_variation.quantity < self.quantity:
            return False
        # Check if there are available prices for today
        available_prices = VariationPrice.objects.filter(variation=self.product_variation,
                                                          start_date__lte=today,
                                                          end_date__gte=today)
        return available_prices.exists()
