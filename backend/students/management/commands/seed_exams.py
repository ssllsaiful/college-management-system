from django.core.management.base import BaseCommand
from students.models import Exam
from django.utils import timezone
import datetime

class Command(BaseCommand):
    help = 'Seeds initial HSC exams'

    def handle(self, *args, **kwargs):
        session = "2025-26"
        exams_data = [
            {'name': 'Mid-Term 2025', 'exam_type': 'Mid-Term', 'date': datetime.date(2025, 6, 15)},
            {'name': 'Half Yearly 2025', 'exam_type': 'Half Yearly', 'date': datetime.date(2025, 12, 10)},
            {'name': 'Pre-Test 2026', 'exam_type': 'Pre-Test', 'date': datetime.date(2026, 3, 5)},
            {'name': 'Test Exam 2026', 'exam_type': 'Test', 'date': datetime.date(2026, 5, 20)},
        ]

        for exam_info in exams_data:
            exam, created = Exam.objects.get_or_create(
                name=exam_info['name'],
                session=session,
                defaults={'exam_type': exam_info['exam_type'], 'date': exam_info['date']}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created exam: {exam.name}'))
            else:
                self.stdout.write(f'Exam already exists: {exam.name}')
