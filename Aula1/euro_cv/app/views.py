from django.shortcuts import render
import json


# Create your views here.
def check(request, phone_number):
    url = 'app/static/data/'+str(phone_number)+'.json'
    json_data = None
    with open(url) as f:
        json_data = json.load(f)
    tparams = { 'cv' : json_data }
    return render(request, 'eurocv.html', tparams)
def index(request):
    return render(request, 'index.html')
def about(request):
    return render(request, 'about.html')
def contact(request):
    return render(request, 'contact.html')