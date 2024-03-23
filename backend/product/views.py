from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q

import time

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = PageNumberPagination  # Using DRF's built-in pagination

    def get_queryset(self):
        queryset = Product.objects.all()
        categories = self.request.query_params.getlist('categories[]', [])
        search_text = self.request.query_params.get('search', '')
        # print(categories)

        # Filter products by categories
        if categories and search_text:
            queryset = queryset.filter(
                Q(name__icontains=search_text) |
                Q(description__icontains=search_text) |
                Q(variations__name__icontains=search_text) &
                Q(categories__name__in=categories)
                ).distinct()
        elif categories:
            queryset = queryset.filter(categories__name__in=categories).distinct()
        
        elif search_text:
            queryset = queryset.filter(
                Q(name__icontains=search_text) |
                Q(description__icontains=search_text) |
                Q(variations__name__icontains=search_text)
            ).distinct()

        return queryset

    def list(self, request, *args, **kwargs):
        # Define page size dynamically based on the query parameter 'page_size' or use a default value
        page_size = int(request.query_params.get('page_size', 6))  # Default page size is 10
        
        # Get user from the authenticated request
        user = request.user
        
        queryset = self.get_queryset()
        # time.sleep(3)
        
        # Paginate queryset with dynamically defined page size
        self.pagination_class.page_size = page_size
        page = self.paginate_queryset(queryset)
        if page is not None:

            serializer = self.get_serializer(page, many=True, context={'user': user})
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True, context={'user': user})
        return Response(serializer.data)


from rest_framework.views import APIView
from .models import Category
from .serializers import CategoryListSerializer

class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.filter(parent__isnull=True)  # Fetch top-level categories
        serialized_data = CategoryListSerializer(categories, many=True).data  # Serialize top-level categories
        
        # For each top-level category, include its subcategories
        for category in serialized_data:
            # print(category)
            subcategories = Category.objects.filter(parent=category['id'])
            subcategory_data = CategoryListSerializer(subcategories, many=True).data
            category['subcategories'] = subcategory_data
        
        return Response(serialized_data)
