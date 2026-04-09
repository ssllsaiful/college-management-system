from django.core.management.base import BaseCommand
from students.models import Subject

class Command(BaseCommand):
    help = 'Seed standard HSC subjects (no 1st/2nd paper distinction)'

    def handle(self, *args, **kwargs):
        subjects = [
            # ── Common for ALL groups ──────────────────────────────────────
            {'name': 'Bangla',                              'code': '101'},
            {'name': 'English',                             'code': '107'},
            {'name': 'ICT',                                 'code': '275'},

            # ── Science Group ──────────────────────────────────────────────
            {'name': 'Physics',                             'code': '174'},
            {'name': 'Chemistry',                           'code': '176'},
            {'name': 'Biology',                             'code': '178'},
            {'name': 'Higher Mathematics',                  'code': '265'},

            # ── Business Studies (Commerce) Group ─────────────────────────
            {'name': 'Accounting',                          'code': '253'},
            {'name': 'Business Organization',               'code': '277'},
            {'name': 'Finance, Banking & Insurance',        'code': '292'},
            {'name': 'Economics',                           'code': '109'},
            {'name': 'Production Management',               'code': '286'},

            # ── Humanities (Arts) Group ───────────────────────────────────
            {'name': 'Civics',                              'code': '269'},
            {'name': 'Islamic History',                     'code': '267'},
            {'name': 'Islamic Studies',                     'code': '249'},
            {'name': 'Logic',                               'code': '121'},
            {'name': 'Social Science',                      'code': '150'},
            {'name': 'Sociology',                           'code': '125'},
            {'name': 'Philosophy',                          'code': '122'},

            # ── Business Studies + Humanities (shared) ────────────────────
            {'name': 'Home Science',                        'code': '215'},
        ]

        self.stdout.write(self.style.WARNING('Deleting all existing subjects...'))
        Subject.objects.all().delete()

        for data in subjects:
            subj = Subject.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f'  [OK] Created: {subj.name} ({subj.code})'))

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! {len(subjects)} subjects seeded successfully.'
        ))
