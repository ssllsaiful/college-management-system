from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('pds_id', 'name', 'designation', 'subject', 'phone', 'email')
    search_fields = ('name', 'pds_id', 'subject')
