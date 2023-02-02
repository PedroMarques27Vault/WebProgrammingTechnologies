from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.core import validators

from app.models import Promotion

from app.models import Promotion


def cardNo(value):
    if len(str(value)) != 16 or value < 0:
        raise forms.ValidationError("Card Number Should Have 16 digits")


def cardCode(value):
    if len(str(value)) != 3 or value < 0:
        raise forms.ValidationError("Card Code Should Have 3 digits")


def expirationYear(value):
    if len(str(value)) != 4 or value < 2021:
        raise forms.ValidationError("Card Expiration Year Should Be YYYY")


def expirationMonth(value):
    if value > 12 or value <= 0:
        raise forms.ValidationError("Card Expiration Month Should Be MM")


class newUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class paymentForm(forms.Form):
    TYPES = (('Credit Card', 'Credit Card'), ('Debit Card', 'Debit Card'))
    type = forms.ChoiceField(choices=TYPES)
    card_no = forms.IntegerField(label='Card Number', validators=[cardNo])
    card_code = forms.IntegerField(label='Code', validators=[cardCode])
    expirationMonth = forms.IntegerField(label='Card Expiration Month', validators=[expirationMonth])
    expirationYear = forms.IntegerField(label='Card Expiration Year', validators=[expirationYear])
    address = forms.CharField(label='Address', max_length=250)
    useCredits = forms.BooleanField(required=False, label="Use Credits?")


class ProductForm(forms.Form):
    name = forms.CharField(label="Name", max_length=80)
    price = forms.FloatField(label="Price",
                             validators=[validators.MinValueValidator(0), validators.MaxValueValidator(99999)])
    description = forms.CharField(label="Description", max_length=250)
    imageProduct = forms.ImageField(label="Product Image")
    quantity = forms.IntegerField(label="Quantity", validators=[validators.MinValueValidator(0)])
    stock = forms.BooleanField(label="Stock")
    brand = forms.CharField(label="Brand", max_length=80)
    category = forms.ChoiceField(choices=(('Smartphones', 'Smartphones'),
                                          ('Computers', 'Computers'),
                                          ('Tablets', 'Tablets'),
                                          ('Drones', 'Drones')
                                          , ('Televisions', 'Televisions')))
    promotion = forms.ChoiceField(choices=[(x.id, x.name) for x in Promotion.objects.all()], required=False)


class PromotionForm(forms.Form):
    name = forms.CharField(label="Name", max_length=80)
    discount = forms.FloatField(label="Discount")
    description = forms.CharField(label="Description", max_length=250)
    deadline = forms.DateField(label="Deadline", help_text='Required. Format: YYYY-MM-DD')


class CommentForm(forms.Form):
    userName = forms.CharField(label="Username", max_length=80)
    userEmail = forms.EmailField(label="User email")
    description = forms.CharField(label="Description", max_length=250)
    rating = forms.IntegerField(label="Rating",
                                validators=[validators.MinValueValidator(1), validators.MaxValueValidator(5)])


class createProductForm(forms.Form):
    name = forms.CharField(label="Name", required=True)
    price = forms.FloatField(label="Price", required=True)
    description = forms.CharField(label="Description", required=True, max_length=350)
    image = forms.ImageField(label="Image")
    quantity = forms.IntegerField(label="Quantity", required=True, min_value=0)
    brand = forms.CharField(label="Brand")
    CATEGORY = (
    ('Smartphones', 'Smartphones'), ('Computers', 'Computers'), ('Tablets', 'Tablets'), ('Drones', 'Drones'),
    ('Televisions', 'Televisions'))
    category = forms.ChoiceField(choices=CATEGORY)
    promotion = forms.ModelChoiceField(queryset=Promotion.objects.all(), required=False)
    conditions = (('New', 'New'), ('Used', 'Used'))
    condition = forms.ChoiceField(choices=conditions)




class updateUserForm(forms.Form):
    first_name = forms.CharField(label='First Name')
    last_name = forms.CharField(label='Last Name')
    username = forms.CharField(label='Username')
    email = forms.EmailField(label='Your Email')
    currentPassword = forms.CharField(label='Current Password', widget=forms.PasswordInput())
    newPassword = forms.CharField(label='New Password', widget=forms.PasswordInput())
    repeatNewPassword = forms.CharField(label='Repeat New Password', widget=forms.PasswordInput())
