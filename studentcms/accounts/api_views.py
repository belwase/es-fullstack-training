from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from accounts.models import Profile



@csrf_exempt
def StudentAPIView(request, id=None):
	output = {"data": None}
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

	elif method == "PATCH":
		print("doing patch..")

	elif method == "DELETE":
		print("doing delete..")

	return JsonResponse(output)
