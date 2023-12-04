from django.shortcuts import render
from django.http import HttpResponse

from accounts.models import Profile
from courses.models import Course, StudentCourse


def CourseView(request):
	
	courses = Course.objects.all()
	output = {
		"courses": courses
	}
	return render(request, "courses.html", output)


def CourseAssignmentView(request):
	output = {}
	output['students'] = Profile.objects.filter(
		).values('id', 'first_name')

	courses = Course.objects.filter()
	output['courses'] = courses.values('id', 'name')
	output['student_courses'] = StudentCourse.objects.filter(
		).values('student__first_name', 'course__name')
	return render(request, "assignment.html", output)


