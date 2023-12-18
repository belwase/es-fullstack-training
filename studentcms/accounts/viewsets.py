from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response

from accounts.models import Profile
from accounts.serializers import ProfileSerializer, ProfileDetailSerializer, \
ProfileCreateSerializer, ProfilePatchSerializer


# class ProfileViewSet(viewsets.ModelViewSet):
#     serializer_class = ProfileSerializer
#     queryset = Profile.objects.filter(is_deleted=False)


class ProfileViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Profile.objects.all()
        serializer = ProfileSerializer(queryset, many=True)
        profiles = serializer.data
        for profile in profiles:
            print(profile)
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


