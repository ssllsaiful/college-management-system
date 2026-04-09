from rest_framework import serializers
from .models import Exam, FeePayment, Mark, Subject, Student


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code']


class StudentSerializer(serializers.ModelSerializer):
    subjects = serializers.PrimaryKeyRelatedField(many=True, queryset=Subject.objects.all(), required=False)
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'father_name', 'mother_name',
            'mobile', 'email', 'session', 'class_name', 'group', 'roll_number',
            'admission_date', 'fourth_subject', 'subjects', 'note',
        ]


class FeePaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.full_name')

    class Meta:
        model = FeePayment
        fields = ['id', 'student', 'student_name', 'fee_type', 'amount', 'paid_at', 'note']


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'name', 'exam_type', 'session', 'date']


class MarkSerializer(serializers.ModelSerializer):
    total_marks = serializers.SerializerMethodField()

    class Meta:
        model = Mark
        fields = ['id', 'student', 'exam', 'subject', 'cq_marks', 'mcq_marks', 'lab_marks', 'total_marks', 'full_marks', 'is_absent']

    def get_total_marks(self, obj):
        return obj.cq_marks + obj.mcq_marks + obj.lab_marks
