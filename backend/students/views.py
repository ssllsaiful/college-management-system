from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import Exam, FeePayment, Mark, Subject, Student
from .serializers import ExamSerializer, FeePaymentSerializer, MarkSerializer, SubjectSerializer, StudentSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.prefetch_related('subjects').all()
    serializer_class = StudentSerializer
    filterset_fields = ['session', 'class_name', 'group', 'roll_number']


class FeePaymentViewSet(viewsets.ModelViewSet):
    queryset = FeePayment.objects.select_related('student').all()
    serializer_class = FeePaymentSerializer


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class MarkViewSet(viewsets.ModelViewSet):
    queryset = Mark.objects.select_related('student', 'exam', 'subject').all()
    serializer_class = MarkSerializer

@api_view(['GET'])
def dashboard_stats(request):
    total_students = Student.objects.count()
    total_fees_dict = FeePayment.objects.aggregate(Sum('amount'))
    total_fees = total_fees_dict['amount__sum'] or 0

    group_distribution = list(Student.objects.values('group').annotate(count=Count('id')))
    
    recent_students = Student.objects.order_by('-admission_date', '-id')[:5]
    recent_students_data = StudentSerializer(recent_students, many=True).data

    return Response({
        'total_students': total_students,
        'total_fees': total_fees,
        'group_distribution': group_distribution,
        'recent_students': recent_students_data
    })
