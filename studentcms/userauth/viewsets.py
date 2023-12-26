from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from userauth.serializers import RegisterSerializer
from userauth.models import User


class RegisterViewSet(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []

    @swagger_auto_schema(
        request_body=RegisterSerializer
    )
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        
        if serializer.is_valid():

            user = User.objects.create(**serializer.data)
            user.set_password(serializer.data['password'])
            user.is_active = True
            user.save()
            data = serializer.data
            data['id'] = user.id
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
