import logging
from rest_framework.generics import CreateAPIView
from rest_framework.exceptions import ValidationError
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import OrderItem, Product, CartItem, Order
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer

logger = logging.getLogger(__name__)

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        logger.info(f"Retrieving product with ID: {kwargs['pk']}")
        return super().get(request, *args, **kwargs)

    
class CartListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        
        order_items_data = self.request.data.get('items', [])
        for item_data in order_items_data:
            product_id = item_data.get('product')
            quantity = item_data.get('quantity')


            product = Product.objects.get(id=product_id)
            if product.stock < quantity:
                raise ValidationError(f"Insufficient stock for {product.name}. Available: {product.stock}")
            product.stock -= quantity
            product.save() 

            OrderItem.objects.create(order=order, product=product, quantity=quantity)


        
class OrderList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


