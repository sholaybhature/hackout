# Generated by Django 3.1.3 on 2020-11-08 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20201108_1102'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='description',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
