from django.shortcuts import render
from django.http import HttpResponse

from accounts.models import Profile

import json


def StudentView(request):
	
	students = Profile.objects.all()
	output = {
		"students": students
	}
	return render(request, "student.html", output)

def StudentAddView(request):
	output = {"message": ""}

	method = request.method
	if method == 'POST':
		data = request.POST
		profile_data = {
			'first_name': data['first_name'],
			'last_name': data['last_name'],
			'phone' :data['phone'],
			'email': data['email'],
			'password' :data['password']
		}
		
		profile = Profile.objects.filter(email=profile_data['email'])
		if profile:
			output['message'] = f"Student with email : {profile_data['email']} already exists."
		else:
			p = Profile(**profile_data)
			p.save()
			output['message'] = f"{profile_data['first_name']} Added Successfully !"

	students = Profile.objects.all()
	output['students'] = students
	return render(request, "student.html", output)
