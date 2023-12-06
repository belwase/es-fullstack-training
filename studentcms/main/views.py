from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from accounts.models import Profile
from courses.models import Course
from main.helper.token import encode


# Without html
# def HomeView(request):
# 	#total_students = len(Profile.objects.all())
# 	total_students = Profile.objects.count()
# 	total_courses = Course.objects.count()
# 	output = f"""
# 		Total Students : {total_students},
# 		Total Courses : {total_courses}
# 		"""
# 	return HttpResponse(output)

# With html
def HomeView(request):
	#total_students = len(Profile.objects.all())
	total_students = Profile.objects.count()
	total_courses = Course.objects.count()
	
	output = {
		"total_students": total_students,
		"total_courses": total_courses
	}
	return render(request, "index.html", output)

@csrf_exempt
def TokenView(request):
	data = json.loads(request.body)
	p = Profile.objects.filter(
		email=data['email'],
		password=data['password']
		)
	if not p:
		return JsonResponse({"messages": ["Invalid login credentials"]})

	p = p.first()
	payload = {
		"id": p.id,
		"first_name": p.first_name
	}
	token = encode(payload)
	return JsonResponse({"data": {"token": token}})

