from .models import Location
from rest_framework import serializers

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'

    def save(self):
        print(self.validated_data)
        area = self.validated_data['area']
        latitude = self.validated_data['latitude']
        longitude = self.validated_data['longitude']
        radius = self.validated_data['radius']
        variant = self.validated_data['variant']
        # send_email(from=email, message=message)