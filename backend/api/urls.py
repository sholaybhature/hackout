from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('list/', views.LocationList.as_view()),
    path('post/', views.LocationCreate.as_view()),
    path('update/<int:pk>/', views.LocationUpdate.as_view()),
]