
from django.urls import path

from courses.views import CourseView, CourseAssignmentView

urlpatterns = [
    path('', CourseView, name='course-list'),
    path('assignment/', CourseAssignmentView, name='course-assignment'),

]
