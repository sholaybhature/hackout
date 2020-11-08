from django.shortcuts import render

from django.http import HttpResponse

from django_filters import rest_framework as filters

from .models import *
from .serializers import *

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from geopy.point import Point
from geopy.geocoders import Nominatim
from geopy.distance import geodesic 


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    filterset_fields = ('latitude', 'longitude', 'variant', 'radius')

class LocationUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationCreate(generics.CreateAPIView):
    serializer_class = LocationSerializer

    def post(self, request, format=None):

        # Get latitutde,longitude and variant from the POST data
        lat = request.data['latitude']
        longi = request.data['longitude']
        variant = request.data['variant']

        # Try to get name of the city from the coordinates
        try:
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

        except Exception as e:
            pass

        # earlier checked area in backend, now checked in frontend itself
        # serializer = LocationSerializer(data={
        #     'name': request.data['name'],
        #     'area': request.data['area'],
        #     'latitude': request.data['latitude'],
        #     'longitude': request.data['longitude'],
        #     'radius': request.data['radius'],
        #     'upvotes': request.data['upvotes'],
        #     'variant': request.data['variant'],
        #     })
        serializer = LocationSerializer(data=request.data)

        if serializer.is_valid():

            # This should go in serializers.py, should use GeoDjango
            
            """
            Checks nearby coordinates, four choice of coordinates available.
            i)   Less than, Less than
            ii)  Less than, Greater than
            iii) Greater than, Greater than
            iv)  Greater than, Less than
            Check the distance of current lat and longi to these points.
            If distance is less than 0.5kilometre, increase the radius of 
            the nearest coordinate.
            """

            coord_lower_ = Location.objects.filter(latitude__lte=lat, longitude__lte=longi, variant=variant).last()
            coord_lower = Location.objects.filter(latitude__lte=lat, longitude__gte=longi,variant=variant).last()
            coord_greater_ = Location.objects.filter(latitude__gte=lat, longitude__gte=longi,variant=variant).last()
            coord_greater = Location.objects.filter(latitude__gte=lat, longitude__lte=longi,variant=variant).last()

            current_points = (lat,longi) 
            ls = [coord_lower_,coord_lower, coord_greater_,coord_greater]
            change_radius = False
            
            for i in ls:
 
                try:
                    coord_points = (i.latitude, i.longitude)
                    km = geodesic(coord_points, current_points).km
                    if km < 0.5:
                        index = i
                        change_radius = True
                        index.radius += 1
                        index.save() 
                except Exception as e:
                    continue
                
            # if change_radius == True:
            #     index.radius += 1
            #     index.save() 
           
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

