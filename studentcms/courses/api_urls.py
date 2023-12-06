from django.urls import path

from courses.api_views import CourseAPIView, CourseStudentAPIView


urlpatterns = [
    path('', CourseAPIView),
    path('students', CourseStudentAPIView),
    path('<int:id>', CourseAPIView),
]

