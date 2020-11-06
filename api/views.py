from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .models import *
from .serializers import *
from rest_framework import generics



def index(request):
    return HttpResponse("Hello, world.")

class LocationList(generics.ListAPIView, generics.CreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

