from rest_framework import serializers
from rest_framework import validators

from userauth.models import User


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, validators=[
        validators.UniqueValidator(queryset=User.objects.all())
        ]
    )
    password = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
