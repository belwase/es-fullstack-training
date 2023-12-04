from django.shortcuts import render
from django.http import HttpResponse

from datetime import datetime
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
	

	if request.method == 'POST':
		course_id = request.POST['course']
		student_id = request.POST['student']

		sc = StudentCourse.objects.filter(
			student_id=student_id,
			course_id=course_id
			)
		if sc:
			output['message'] = 'Already enrolled'
		else:
			sc = StudentCourse(
				student_id=student_id,
				course_id=course_id,
				registration_date=datetime.now()
				)
			sc.save()

	output['students'] = Profile.objects.filter(
		).values('id', 'first_name')

	courses = Course.objects.filter()
	output['courses'] = courses.values('id', 'name')
	output['student_courses'] = StudentCourse.objects.filter(
		).values('student__first_name', 'course__name')

	return render(request, "assignment.html", output)


