from django.db import models

# Create your models here.
class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=70)
    email = models.EmailField()
    def __str__(self):
        return self.name

class Publisher(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=70)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    website = models.URLField()
    def __str__(self):
        return self.name


class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    date = models.DateField()
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete = models.CASCADE)
    def __str__(self):
        return self.title