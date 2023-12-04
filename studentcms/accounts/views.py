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
	output = {"messages": []}

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
		
		if len(profile_data['first_name']) < 5:
			output['messages'].append("first_name should be at least 5 characters")

		if len(profile_data['last_name']) < 5:
			output['messages'].append("last_name should be at least 5 characters")

		if not profile_data['phone'].isdigit():
			output['messages'].append("Invalid phone number")

		if not output['messages']:

			profile = Profile.objects.filter(email=profile_data['email'])
			if profile:
				output['messages'].append(f"Student with email : {profile_data['email']} already exists.")
			else:
				p = Profile(**profile_data)
				p.save()
				output['messages'].append(f"{profile_data['first_name']} Added Successfully !")

	students = Profile.objects.all()
	output['students'] = students
	return render(request, "student.html", output)
