from django.contrib import admin
from .models import Exam, FeePayment, Mark, Subject, Student

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name', 'code')

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'class_name', 'group', 'session', 'roll_number', 'mobile')
    list_filter = ('class_name', 'group', 'session')
    search_fields = ('first_name', 'last_name', 'father_name', 'roll_number', 'mobile')

@admin.register(FeePayment)
class FeePaymentAdmin(admin.ModelAdmin):
    list_display = ('student', 'fee_type', 'amount', 'paid_at')
    list_filter = ('fee_type',)
    search_fields = ('student__first_name', 'student__last_name', 'student__roll_number')

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam_type', 'session', 'date')
    list_filter = ('exam_type', 'session')

@admin.register(Mark)
class MarkAdmin(admin.ModelAdmin):
    list_display = ('student', 'exam', 'subject', 'cq_marks', 'mcq_marks', 'lab_marks', 'full_marks', 'is_absent')
    list_filter = ('exam', 'subject')
