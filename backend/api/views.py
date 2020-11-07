from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from geopy.point import Point
from geopy.geocoders import Nominatim
from geopy.distance import geodesic 
from django.db.models import F, Sum

class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationCreate(generics.CreateAPIView):
    serializer_class = LocationSerializer

    def post(self, request, format=None):

        lat = request.data['latitude']
        longi = request.data['longitude']


        geolocator = Nominatim(user_agent="direpair")
        location = geolocator.reverse(Point(lat, longi), language='en',exactly_one=True)
        loc = location.raw
        loc_dict = location.raw

        if "county" in loc_dict['address']:
            area = loc_dict['address']['county']

        elif "city" in loc_dict['address']:
            area = loc_dict['address']['city']
        else: 
            area = ''

        serializer = LocationSerializer(data={
            'area': area,
            'latitude': request.data['latitude'],
            'longitude': request.data['longitude'],
            'radius': request.data['radius'],
            'variant': request.data['variant'],
            })
            
        if serializer.is_valid():
            SumCord = Location.objects.all().\
            annotate(sum=F('latitude') + F('longitude')
            )
            coord_lower = SumCord.filter(sum__lte=float(lat)+float(longi)).order_by('latitude', 'longitude').first()
            coord_higher = SumCord.filter(sum__gte=float(lat)+float(longi)).order_by('latitude', 'longitude').last()
            print(coord_lower)
            print(coord_higher)
            if abs(coord_lower.longitude+coord_lower.latitude - (float(lat)+float(longi))) < abs(coord_higher.longitude+coord_higher.latitude - (float(lat)+float(longi))):
                coord = coord_lower
            else:
                coord = coord_higher
            print(coord)
            coord_points = (coord.latitude, coord.longitude)
            current_points = (lat,longi) 
            km = geodesic(coord_points, current_points).km
            print(km)
            serializer.save()
            # coord_higher = Location.objects.filter(rating__gte=user_rating).order_by('rating').first()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)