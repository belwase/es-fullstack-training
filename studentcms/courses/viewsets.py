from rest_framework import viewsets

from courses.models import Course, StudentCourse
from courses.serializers import CourseSerializer, StudentCourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

class StudentCourseViewSet(viewsets.ModelViewSet):
    serializer_class = StudentCourseSerializer
    queryset = StudentCourse.objects.all()

