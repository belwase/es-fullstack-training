from django.db import models


class Profile(models.Model):
	first_name = models.CharField(max_length=100)
	last_name = models.CharField(max_length=100)
	email = models.CharField(
			max_length=50,
			null=False,
			unique=True
			)
	password = models.CharField(max_length=40)
	phone = models.CharField(max_length=20)

	def __str__(self):
		return self.first_name


