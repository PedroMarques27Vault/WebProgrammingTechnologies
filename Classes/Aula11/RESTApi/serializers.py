from rest_framework import serializers

from models import Author, Publisher, Book


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = {'id','name','email'}

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = {'id','name','city','country','website'}

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = {'id','title','date','authors','publisher'}