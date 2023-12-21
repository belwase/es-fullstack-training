from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework_simplejwt.authentication import JWTAuthentication


from courses.models import Course, StudentCourse
from courses.serializers import CourseSerializer, StudentCourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    @method_decorator(cache_page(60))
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        return Response(data)

class StudentCourseViewSet(viewsets.ModelViewSet):
    serializer_class = StudentCourseSerializer
    queryset = StudentCourse.objects.all()

    permission_classes = []
    authentication_classes = []
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

