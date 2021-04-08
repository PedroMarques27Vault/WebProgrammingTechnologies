"""ExAula URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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

from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authors/',views.authorNames, name='authors'),
    path('books/',views.bookTitles, name='books'),
    path('publishers/',views.publishersNames, name='publishers'),
    path('authors/author/<int:num>',views.detailsAuthor, name='author'),
    path('books/book/<int:num>',views.detailsBook, name='book'),
    path('publishers/publisher/<int:num>',views.detailsPublisher, name='publisher'),
    path('booksearch/', views.booksearch, name='simple_search'),
    path('bookquery/', views.bookquery, name='query_search')
]
