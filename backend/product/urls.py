from django.urls import path
from .views import ProductListView, CategoryList

urlpatterns = [
    path('list/', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryList.as_view(), name='category-list'),
]