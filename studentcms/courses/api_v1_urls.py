from django.urls import path, include
from rest_framework import routers

from courses.api_views import CourseAPIView, CourseStudentAPIView
from courses.viewsets import CourseViewSet, StudentCourseViewSet


router = routers.DefaultRouter()
router.register(r'', CourseViewSet)
router.register(r'students', StudentCourseViewSet)


urlpatterns = [
    path('', include(router.urls)),
]

