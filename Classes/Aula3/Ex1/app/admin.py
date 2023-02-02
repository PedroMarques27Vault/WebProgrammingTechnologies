from django.contrib import admin

# Register your models here.
from app.models import Author, Publisher, Book

admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(Book)