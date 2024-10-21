# products/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import (
    ProductListCreate,
    ProductRetrieveUpdateDestroy,
    CartListCreate,
    CartUpdateDelete,
    OrderCreateView, 
    OrderList,
)

urlpatterns = [
    path('products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroy.as_view(), name='product-detail'),
    path('cart/', CartListCreate.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartUpdateDelete.as_view(), name='cart-update-delete'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),  
    path('history/', OrderList.as_view(), name='order-history'), 
    
    
]

if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)