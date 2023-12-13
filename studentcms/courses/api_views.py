from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from courses.models import Course, StudentCourse
import json
from datetime import datetime


@csrf_exempt
def CourseAPIView(request, id=None):
	output = {"data": None, "messages":[]}
	method = request.method

	if method == "GET":
		print("doing get..")
		if id is None:
			courses = list(Course.objects.filter(
				).values('id','name'))
			output['data'] = courses
		else:
			course = Course.objects.get(id=id)
			output['data'] = {
				'id': id,
				'name': course.name
			}

	elif method == "POST":
		print("doing post..")
		print("raw data : ", request.body)
		data = json.loads(request.body)
		print("Json converted data : ", data)

		course_data = {
			'name': data['name'],
			'instructor': data['instructor'],
			'description' :data['description'],
			'duration': data['duration'],
			'fee' :data['fee'],
			'start_date' :data['start_date'],
		}
		
		if len(course_data['name']) < 3:
			output['messages'].append("name should be at least 3 characters")

		if not output['messages']:

			course = Course.objects.filter(name=course_data['name'])
			if course:
				output['messages'].append(f"Coourse with name : {course_data['name']} already exists.")
			else:
				c = Course(**course_data)
				c.save()
				output['messages'].append(f"{course_data['name']} Added Successfully !")


	elif method == "PATCH":
		print("doing patch..")
		data = json.loads(request.body)
		c = Course.objects.filter(id=id)
		if not c:
			output['messages'] = f'Course with id : {id} does not exists.'
		else:
			data_to_update = {}
			fields = ['name', 'instructor', 'description']
			for field in fields:
				if data.get(field):
					data_to_update[field] = data.get(field)

			c.update(**data_to_update)
			output['messages'] = 'Updated Successfully'


	elif method == "DELETE":
		print("doing delete..")
		c = Course.objects.filter(id=id)
		if not c:
			output['messages'] = f'Course with id : {id} does not exists.'
		else:
			c.delete()
			output['messages'] = 'Course deleted Successfully'

	return JsonResponse(output)

@csrf_exempt
def CourseStudentAPIView(request):
	output = {"data": None}
	method = request.method

	if method == "GET":
		student_courses = list(StudentCourse.objects.filter(
			).values(
				'id',
				'student_id',
				'course_id',
				'student__first_name',
				'course__name'
				)
			)
		scs = []
		for sc in student_courses:
			scs.append({
					'student_id': sc['student_id'],
					'student_name': sc['student__first_name'],
					'course_id': sc['course_id'],
					'course_name': sc['course__name']
				})
		output['data'] = scs

	elif method == 'POST':
		print(request.body)
		data = json.loads(request.body)
		print(data)
		check = StudentCourse.objects.filter(
			course_id=data['course_id'],
			student_id=data['student_id']
			)
		if check:
			output['message'] = f'Student with id {data["student_id"]} already enrolled.'
		else:
			sc = StudentCourse(
					student_id=data['student_id'],
					course_id=data['course_id'],
					registration_date=datetime.now()
					)
			sc.save()
			output['message'] = 'Student Enrolled'

	return JsonResponse(output)
