from django.http import JsonResponse


def StudentAPIView(request):
	output = {"data": None}
	method = request.method

	if method == "GET":
		print("doing get..")

	elif method == "POST":
		print("doing post..")

	elif method == "PATCH":
		print("doing patch..")

	elif method == "DELETE":
		print("doing delete..")

	return JsonResponse(output)
