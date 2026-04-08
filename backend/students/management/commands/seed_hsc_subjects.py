from django.core.management.base import BaseCommand
from students.models import Subject

class Command(BaseCommand):
    help = 'Seed exactly standard HSC subjects'

    def handle(self, *args, **kwargs):
        subjects = [
            {'name': 'Bengali 1st Paper', 'code': '101'},
            {'name': 'Bengali 2nd Paper', 'code': '102'},
            {'name': 'English 1st Paper', 'code': '107'},
            {'name': 'English 2nd Paper', 'code': '108'},
            {'name': 'Information & Comm. Technology (ICT)', 'code': '275'},
            {'name': 'Physics 1st Paper', 'code': '174'},
            {'name': 'Physics 2nd Paper', 'code': '175'},
            {'name': 'Chemistry 1st Paper', 'code': '176'},
            {'name': 'Chemistry 2nd Paper', 'code': '177'},
            {'name': 'Higher Mathematics 1st Paper', 'code': '265'},
            {'name': 'Higher Mathematics 2nd Paper', 'code': '266'},
            {'name': 'Biology 1st Paper', 'code': '178'},
            {'name': 'Biology 2nd Paper', 'code': '179'},
            {'name': 'Accounting 1st Paper', 'code': '253'},
            {'name': 'Accounting 2nd Paper', 'code': '254'},
            {'name': 'Business Org. & Management 1st Paper', 'code': '277'},
            {'name': 'Business Org. & Management 2nd Paper', 'code': '278'},
            {'name': 'Finance, Banking & Ins. 1st Paper', 'code': '292'},
            {'name': 'Finance, Banking & Ins. 2nd Paper', 'code': '293'},
            {'name': 'Economics 1st Paper', 'code': '109'},
            {'name': 'Economics 2nd Paper', 'code': '110'},
            {'name': 'Civics & Good Governance 1st Paper', 'code': '269'},
            {'name': 'Civics & Good Governance 2nd Paper', 'code': '270'},
            {'name': 'History 1st Paper', 'code': '153'},
            {'name': 'History 2nd Paper', 'code': '154'},
            {'name': 'Islamic History & Culture 1st Paper', 'code': '267'},
            {'name': 'Islamic History & Culture 2nd Paper', 'code': '268'},
        ]

        Subject.objects.all().delete()
        
        for data in subjects:
            subj, created = Subject.objects.get_or_create(**data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created subject: {subj.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Subject already exists: {subj.name}"))
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded HSC subjects.'))
