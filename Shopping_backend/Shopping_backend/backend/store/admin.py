from django.contrib import admin
from .models import Product, Order, OrderItem 

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')  
    search_fields = ('name',)  

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'created_at') 
    search_fields = ('user__username',)  
    list_filter = ('created_at',)  
    ordering = ('-created_at',)  

    def total_price(self, obj):
        return obj.total_price  
