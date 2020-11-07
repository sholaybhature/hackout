from .models import Location
from rest_framework import serializers
from geopy.point import Point
from geopy.geocoders import Nominatim
from geopy.distance import geodesic 
from django.db.models import F, Sum

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'
