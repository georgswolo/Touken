from django.urls import path
from . import views

urlpatterns = [
    path('', views.getData),
    path('add/', views.addData),
    path('person/', views.getUser),
    path('person/add/', views.addUser)  
]