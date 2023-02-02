from app.models import *
from rest_framework import serializers
import base64
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_token')
    def get_token(self, obj):
        return self.context.get("token")

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_superuser','date_joined', 'token')




class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ('id', 'name', 'discount', 'description', 'deadline')



class ProductSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer()

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)

    def get(self):
        image = serializers.SerializerMethodField('get_image_url')
        conditions = ['New', 'Used']

    class Meta:
        model = Product
        fields = ('id', 'name', 'price','seller', 'description', 'quantity', 'stock', 'brand', 'category', 'promotion', 'date',
                  'conditions', 'condition', 'image')






class SoldSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    promotion = PromotionSerializer()

    class Meta:
        model = Sold
        fields = ('id', 'product', 'quantity', 'buyer', 'date', 'buyer', 'promotion', 'total')


class CommentSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Comment
        fields = ('id', 'userName', 'userEmail', 'description', 'rating', 'commentDate', 'product')


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ('id', 'type', 'card_no')


class ShoppingCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingCart
        fields = ('id', 'user_id')


class PaymentSerializer(serializers.ModelSerializer):
    method = PaymentMethodSerializer()
    shopping_cart = ShoppingCartSerializer()

    class Meta:
        model = Payment
        fields = ('id', 'address', 'total', 'date', 'method', 'shopping_cart', 'usedCredits', 'username')


class ShoppingCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = ShoppingCartItem
        fields = ('id', 'quantity', 'cart_id', 'product')
