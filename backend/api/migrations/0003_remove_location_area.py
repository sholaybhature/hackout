# Generated by Django 3.1.3 on 2020-11-06 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_location_variant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='area',
        ),
    ]
