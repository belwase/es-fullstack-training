from django.contrib import admin

from courses.models import Course, StudentCourse


class CourseAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "instructor", "duration", "start_date", "is_deleted", "custom_field1"]
    #exclude = ["name"]

    def custom_field1(self, obj):
    	return f"Field: {obj.id}"

admin.site.register(Course, CourseAdmin)


class StudentCourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'course', 'registration_date']
    fields = ["registration_date"]

admin.site.register(StudentCourse, StudentCourseAdmin)
