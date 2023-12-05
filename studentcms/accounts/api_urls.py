from django.urls import path

from accounts.api_views import StudentAPIView


urlpatterns = [
    path('', StudentAPIView),
    path('<int:id>', StudentAPIView),
]

