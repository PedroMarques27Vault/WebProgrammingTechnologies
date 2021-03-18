from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def hello(request):
    return HttpResponse("Hello World!")

def numero(request, num):
    resp = "<html><body><h1> { } </h1></body></html>".format(num)
    return HttpResponse(num)

def numerot(request, num):
    tparams = { 'num_arg':num, }
    return render(request, 'numerot.html', tparams)