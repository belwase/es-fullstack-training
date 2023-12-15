from django.urls import path

from accounts.views import StudentView, StudentAddView



urlpatterns = [
    path('', StudentView, name='student-list'),
    path('add/', StudentAddView, name='student-add'),
]
