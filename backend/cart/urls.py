from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListCartItems.as_view(), name='list_cart_items'),
    path('add/', views.AddCartItem.as_view(), name='add_cart_item'),
    path('update/<int:cart_item_id>/', views.UpdateCartItem.as_view(), name='update_cart_item'),
    path('delete/<int:pk>/', views.DeleteCartItem.as_view(), name='delete_cart_item'),
    path('delivery/', views.ListDeliveryInformation.as_view(), name='retrieve_delivery_info'),
    path('delivery/add/', views.CreateDeliveryInformation.as_view(), name='create_delivery_info'),
    path('delivery/delete/<int:pk>/', views.DeleteDeliveryInformation.as_view(), name='delete_delivery_info'),
    path('delivery/select/<int:address_id>/', views.SelectDeliveryInformation.as_view(), name='select_delivery_info'),
]
