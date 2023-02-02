"""webproj URL Configuration

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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from app import views
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.urls import path

urlpatterns = [
    # username, password
    path('login', views.log_in),
    path('signup', views.sign_up),
    path('profile', views.getMyDetails),
    path('users', views.get_users),
    path('account/<str:username>', views.get_account_byUsername),
    path('userdel/<int:id>', views.del_user),
    path('userup/<int:id>', views.update_user),
    path('user/credits', views.getCredits),

    # Products
    path('product/<int:id>', views.get_product),
    path('products', views.get_products),
    path('productcre', views.create_product),
    path('productup/<str:id>', views.update_product),
    path('productdel/<int:id>', views.del_product),

    #Search
    path('search', views.search_products),

    # Promotions
    path('promotions', views.get_promotions),
    path('promotioncre', views.create_promotion),
    path('promotionup/<int:id>', views.update_promotion),
    path('promotiondel/<int:id>', views.del_promotion),

    #Comments
    path('comments', views.get_comments),
    path('comments/<int:id>', views.get_commentById),
    path('product/<int:productId>/comment/', views.get_commentByProductId),
    path('commentcre', views.create_comment),
    path('commentdel/<int:id>', views.del_comment),
    #Sold
    path('sold/seller/<str:username>', views.getSoldProductsBySeller),
    path('sold/buyer/<str:username>', views.getSoldProductsByBuyer),

    #Cart
    path('cart', views.getCart),
    path('cart/total', views.getCartTotal),
    path('addToCart', views.setInCart),
    path('pay', views.checkout),
    path('shoppingcarts/<str:username>', views.getBoughShoppingCarts),
    path('shoppingcarts/<int:id>/items/', views.getShoppingCartItemsByCart),



    #path('products/sold', views.sold_products),
    path('admin/', admin.site.urls),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    """
    path('addToCart/<str:id>', views.addToCart, name='addToCart'),
    path('removeFromCart/<str:id>', views.removeFromCart, name='removeFromCart'),
    path('increaseQuantity/<str:id>', views.increaseQuantity, name='increaseQuantity'),
    path('decreaseQuantity/<str:id>', views.decreaseQuantity, name='decreaseQuantity'),


    path('checkout/', views.checkout, name='checkout'),
    path('cart/', views.cart, name='cart')
    """