from django.urls import path
from .views import ProductListView, CategoryList, ProductDetailView

urlpatterns = [
    path('list/', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('detail/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
]