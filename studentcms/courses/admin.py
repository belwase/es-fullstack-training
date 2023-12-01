from django.contrib import admin

from courses.models import Course, StudentCourse


class CourseAdmin(admin.ModelAdmin):
    pass

admin.site.register(Course, CourseAdmin)



class StudentCourseAdmin(admin.ModelAdmin):
    pass

admin.site.register(StudentCourse, StudentCourseAdmin)
