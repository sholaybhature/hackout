from django.db import models

# Create your models here.
class TimeStampModel(models.Model):

    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Location(TimeStampModel):

    class Meta:
        ordering = ['id']


    ROAD = 'RD'
    STREETLIGHT = 'SL'
    PUBLICWASHROOM = 'PW'
    SEWAGE = 'SW'
    GARBAGE = 'GB'
    OTHER = 'OR'
    CHOICES = [
        (ROAD, 'Road'),
        (STREETLIGHT, 'StreetLight'),
        (PUBLICWASHROOM, 'PublicWashroom'),
        (SEWAGE, 'Sewage'),
        (GARBAGE, 'Garbage'),
        (OTHER, 'Other'),
    ]

    area = models.CharField(max_length=100, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    radius = models.FloatField()
    variant = models.CharField(max_length=2, choices=CHOICES, default="RD")

    def __str__(self):
        return 'Longitude:{} Latitude:{}'.format(self.longitude, self.latitude)

