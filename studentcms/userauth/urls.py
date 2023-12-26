from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from userauth.viewsets import RegisterViewSet

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('register/', RegisterViewSet.as_view(), name='register'),
]
