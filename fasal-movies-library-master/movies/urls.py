from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('view/<str:name>/', views.list, name='list'),
    path('playlist/', views.playlist, name='playlist'),
    path('update/', views.update, name='update'),
    path('profile/<str:user_name>/', views.profile, name='profile'),
    path('public/<str:playlist_id>', views.public, name='public'),
]
