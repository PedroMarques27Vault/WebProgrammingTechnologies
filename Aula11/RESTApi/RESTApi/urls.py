"""RESTApi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

import views

urlpatterns = [
    path("api/author/<int:id>", views.getAuthor),
    path("api/authors", views.getAuthors),
    path("api/add_author", views.addAuthor),
    path("api/update_author", views.upAuthor),
    path("api/delete_author/<int:id>", views.delAuthor),

    path("api/book/<int:id>", views.getBook),
    path("api/books", views.getBooks),
    path("api/add_book", views.addBook),
    path("api/update_book", views.upBook),
    path("api/delete_book/<int:id>", views.delBook),

    path("api/publisher/<int:id>", views.getPublisher),
    path("api/publishers", views.getPublishers),
    path("api/add_publisher", views.addPublisher),
    path("api/update_publisher", views.upPublisher),
    path("api/delete_publisher/<int:id>", views.delPublisher),
]
