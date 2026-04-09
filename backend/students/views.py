from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import Exam, FeePayment, Mark, Subject, Student, AcademicSession
from .serializers import (
    ExamSerializer, FeePaymentSerializer, MarkSerializer, 
    SubjectSerializer, StudentSerializer, AcademicSessionSerializer
)


class AcademicSessionViewSet(viewsets.ModelViewSet):
    queryset = AcademicSession.objects.all()
    serializer_class = AcademicSessionSerializer


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

    @action(detail=False, methods=['post'])
    def bulk_save(self, request):
        marks_data = request.data.get('marks', [])
        saved_marks = []
        
        for item in marks_data:
            mark, created = Mark.objects.update_or_create(
                student_id=item.get('student'),
                exam_id=item.get('exam'),
                subject_id=item.get('subject'),
                defaults={
                    'cq_marks': item.get('cq_marks', 0),
                    'mcq_marks': item.get('mcq_marks', 0),
                    'lab_marks': item.get('lab_marks', 0),
                    'full_marks': item.get('full_marks', 100),
                    'is_absent': item.get('is_absent', False),
                }
            )
            saved_marks.append(MarkSerializer(mark).data)
            
        return Response({'status': 'success', 'count': len(saved_marks), 'marks': saved_marks})

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
