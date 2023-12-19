from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from accounts.models import Profile
from main.helper.token import decode

import json


@csrf_exempt
def StudentAPIView(request, id=None):
	output = {"data": None, "messages":[]}
	# print(request.META)
	# token = request.META['HTTP_AUTHORIZATION']
	# decoded = decode(token)
	# if decoded == False:
	# 	output['messages'] = 'Unaurhotized'
	# 	return JsonResponse(output)

	
	method = request.method

	if method == "GET":
		print("doing get..")
		if id is None:
			students = list(Profile.objects.filter(
				).values('id','first_name'))
			output['data'] = students
		else:
			student = Profile.objects.get(id=id)
			output['data'] = {
				'id': id,
				'first_name': student.first_name
			}

	elif method == "POST":
		print("doing post..")
		print("raw data : ", request.body)
		data = json.loads(request.body)
		print("Json converted data : ", data)

		profile_data = {
			'first_name': data['first_name'],
			'last_name': data['last_name'],
			'phone' :data['phone'],
			'email': data['email'],
			'password' :data['password']
		}
		
		if len(profile_data['first_name']) < 3:
			output['messages'].append("first_name should be at least 3 characters")

		if len(profile_data['last_name']) < 3:
			output['messages'].append("last_name should be at least 3 characters")

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


	elif method == "PATCH":
		print("doing patch..")
		data = json.loads(request.body)
		p = Profile.objects.filter(id=id)
		if not p:
			output['messages'] = f'Student with id : {id} does not exists.'
		else:
			data_to_update = {}
			fields = ['first_name', 'last_name', 'phone']
			for field in fields:
				if data.get(field):
					data_to_update[field] = data.get(field)

			p.update(**data_to_update)
			output['messages'] = 'Updated Successfully'


	elif method == "DELETE":
		print("doing delete..")
		p = Profile.objects.filter(id=id)
		if not p:
			output['messages'] = f'Student with id : {id} does not exists.'
		else:
			p.delete()
			output['messages'] = 'Student deleted Successfully'

	return JsonResponse(output)
