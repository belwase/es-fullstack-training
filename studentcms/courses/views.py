from django.shortcuts import render
from django.http import HttpResponse

from courses.models import Course


def CourseView(request):
	
	courses = Course.objects.all()
	output = {
		"courses": courses
	}
	return render(request, "courses.html", output)
