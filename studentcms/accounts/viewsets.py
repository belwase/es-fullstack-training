from django.shortcuts import get_object_or_404

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import Profile
from accounts.serializers import ProfileSerializer, ProfileDetailSerializer, \
ProfileCreateSerializer, ProfilePatchSerializer

import json
from django.conf import settings

# class ProfileViewSet(viewsets.ModelViewSet):
#     serializer_class = ProfileSerializer
#     queryset = Profile.objects.filter(is_deleted=False)

#     def get_serializer_class(self):
#         serializer_mapping = {
#             'POST': ProfileCreateSerializer,
#             'PATCH': ProfilePatchSerializer,
#             'GET': ProfileSerializer
#         }
#         method = self.request.method
#         return serializer_mapping.get(method, ProfileSerializer)


class ProfileViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    #@method_decorator(cache_page(60))
    def list(self, request):

        profiles = settings.REDIS_CLIENT.get('profiles')
        print(profiles)
        if profiles:
            print("Returning from cache..")
            profiles = json.loads(profiles)
        else:
            print("Getting students lists..")
            queryset = Profile.objects.all()
            serializer = ProfileSerializer(queryset, many=True)
            profiles = serializer.data
            settings.REDIS_CLIENT.set('profiles', json.dumps(profiles))

        return Response(profiles, status=status.HTTP_200_OK)

    def retrieve(self, request, pk):
        profile = Profile.objects.get(id=pk)
        #profile = get_object_or_404(Profile, pk)
        serializer = ProfileDetailSerializer(profile)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        serializer = ProfileCreateSerializer(data=data)
        #serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            profile = Profile.objects.create(**serializer.data)
            data = serializer.data
            data['id'] = profile.id
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, pk):
        data = request.data
        serializer = ProfilePatchSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            profile = Profile.objects.filter(id=pk)
            profile.update(**serializer.data)
            return Response(data)

    def destroy(self, request, pk):
        profile = Profile.objects.get(id=pk)
        profile.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


