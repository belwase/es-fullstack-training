from django.http import JsonResponse
from courses.models import Course, StudentCourse


def CourseAPIView(request):
	output = {"data": None}
	method = request.method

	if method == "GET":
		print("doing get..")
		courses = list(Course.objects.filter(
			).values('id','name'))
		output['data'] = courses

	elif method == "POST":
		print("doing post..")

	elif method == "PATCH":
		print("doing patch..")

	elif method == "DELETE":
		print("doing delete..")

	return JsonResponse(output)


def CourseStudentAPIView(request):
	output = {"data": None}
	method = request.method

	if method == "GET":
		student_courses = list(StudentCourse.objects.filter(
			).values('id','student__first_name', 'course__name'))
		
		scs = []
		for sc in student_courses:
			scs.append({
					'student_name': sc['student__first_name'],
					'course_name': sc['course__name']
				})
		output['data'] = scs

	return JsonResponse(output)
