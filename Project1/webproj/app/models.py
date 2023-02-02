from datetime import datetime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from rest_framework import serializers
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets


class Promotion(models.Model):
    name = models.CharField(max_length=80)
    discount = models.FloatField()
    description = models.CharField(max_length=300)
    deadline = models.DateField()

    def __str__(self):
        return self.name



class Product(models.Model):
    name = models.CharField(max_length=80)
    price = models.FloatField()
    description = models.CharField(max_length=300)
    image = models.FileField(upload_to='static/images',blank=True, null=True)
    quantity = models.IntegerField( default=1, validators=[
            MinValueValidator(0)
        ])
    stock = models.BooleanField()
    brand = models.CharField(max_length=80)
    CATEGORY = (('Smartphones', 'Smartphones'),
                ('Computers', 'Computers'),
                ('Tablets', 'Tablets'),
                ('Drones', 'Drones')
                , ('Televisions', 'Televisions'))
    category = models.CharField(max_length=150, choices=CATEGORY)
    promotion = models.ForeignKey(Promotion, default=None, blank=True, null=True, on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.now)
    conditions = (('New', 'New'), ('Used', 'Used'))
    condition = models.CharField(choices=conditions, default='New', null=True, max_length=15)
    seller = models.CharField(default='TechOn',  max_length=150)
    def __str__(self):
        return self.name

    def discount(self):
        if self.promotion:
            return round(self.price*self.promotion.discount,2)
        return 0
    def promotionPrice(self):
        if self.promotion:
            return round(self.price - self.discount(),2)
        return 0

class Sold(models.Model):
    product = models.ForeignKey(Product, null=False,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    buyer = models.CharField(null=False, max_length=150)
    date = models.DateField(default=datetime.now())
    promotion = models.ForeignKey(Promotion, default=None,null=True, on_delete=models.CASCADE)
    total = models.FloatField(default=0.0)

class Comment(models.Model):
    userName = models.CharField(max_length=80)
    userEmail = models.EmailField()
    description = models.CharField(max_length=400)
    rating = models.IntegerField()
    commentDate = models.DateField(default = datetime.now())
    product = models.ForeignKey(Product, default=None, blank = True, null = True, on_delete=models.CASCADE)
    def __str__(self):
        return self.userName





class PaymentMethod(models.Model):
    TYPES = (('Credit Card', 'Credit Card'), ('Debit Card', 'Debit Card'))
    type = models.CharField(choices=TYPES, max_length=150)
    card_no = models.CharField(max_length=16)


class ShoppingCart(models.Model):
    user_id = models.CharField(default = 0, null=False, max_length=150)



class Payment(models.Model):
    address = models.CharField(max_length=250)
    total = models.FloatField(null=False)
    date = models.DateField(default=datetime.now)
    method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    shopping_cart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    usedCredits = models.FloatField(default = 0.0)
    username = models.CharField(max_length=250, default='TechOn')

class ShoppingCartItem(models.Model):
    quantity = models.IntegerField(default=1)
    cart_id = models.CharField(null=True, max_length=150)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)