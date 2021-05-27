from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from models import Author
from serializers import AuthorSerializer, PublisherSerializer, BookSerializer

@api_view(['GET'])
def getAuthor(request, id):
    author = Author.objects.filter(id=id)
    return

@api_view(['GET'])
def getAuthors(request):
    return

@api_view(['POST'])
def addAuthor(request):
    return

@api_view(['PUT'])
def upAuthor(request):
    return

@api_view(['DELETE'])
def delAuthor(request):
    return



@api_view(['GET'])
def getBook():
    return
@api_view(['GET'])
def getBooks():
    return
@api_view(['POST'])
def addBook():
    return
@api_view(['PUT'])
def upBook():
    return
@api_view(['DELETE'])
def delBook():
    return



@api_view(['GET'])
def getPublisher():
    return
@api_view(['GET'])
def getPublishers():
    return
@api_view(['POST'])
def addPublisher():
    return
@api_view(['PUT'])
def upPublisher():
    return
@api_view(['DELETE'])
def delPublisher():
    return



