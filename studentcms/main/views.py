from django.shortcuts import render
from django.http import HttpResponse

from accounts.models import Profile
from courses.models import Course


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
