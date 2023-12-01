from django.db import models

from accounts.models import Profile



class Course(models.Model):
	name = models.CharField(max_length=255)
	description = models.TextField()
	instructor = models.CharField(max_length=50)
	duration = models.CharField(max_length=10)
	fee = models.IntegerField()
	start_date = models.DateField()

	def __str__(self):
		return self.name


class StudentCourse(models.Model):
	student = models.ForeignKey(Profile, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	registration_date = models.DateTimeField()

	def __str__(self):
		return f"{self.student.email} => {self.course.name}"

