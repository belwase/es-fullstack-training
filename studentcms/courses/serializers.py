from courses.models import Course, StudentCourse
from rest_framework import serializers


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'instructor']
        

class StudentCourseSerializer(serializers.ModelSerializer):

    student = serializers.StringRelatedField(source='student.first_name')
    course = serializers.StringRelatedField(source='course.name')

    class Meta:
        model = StudentCourse
        fields = ['id', 'student', 'course']
