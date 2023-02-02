from django import forms

from app.models import Author, Publisher


class BookSearchForm(forms.Form):
    query = forms.CharField(label='Search:', max_length=100)

class AuthorForm(forms.Form):
    name = forms.CharField(label='Name:', max_length=100)
    email = forms.CharField(label='Email:', max_length=100)

class PublisherForm(forms.Form):
    name = forms.CharField(max_length=70)
    city = forms.CharField(max_length=50)
    country = forms.CharField(max_length=50)
    website = forms.URLField()


