from django.contrib import admin

# Register your models here.
from app.models import *

admin.site.register(Promotion)
admin.site.register(Product)
admin.site.register(ShoppingCart)
admin.site.register(ShoppingCartItem)
admin.site.register(PaymentMethod)
admin.site.register(Payment)
admin.site.register(Comment)
admin.site.register(Sold)