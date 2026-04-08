from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=16, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Student(models.Model):
    CLASS_CHOICES = [
        ('XI', 'Class XI'),
        ('XII', 'Class XII'),
    ]
    GROUP_CHOICES = [
        ('Science', 'Science'),
        ('Commerce', 'Commerce'),
        ('Arts', 'Arts'),
    ]

    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120, blank=True)
    father_name = models.CharField(max_length=120, blank=True)
    mother_name = models.CharField(max_length=120, blank=True)
    mobile = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    session = models.CharField(max_length=20)
    class_name = models.CharField(max_length=3, choices=CLASS_CHOICES)
    group = models.CharField(max_length=20, choices=GROUP_CHOICES)
    roll_number = models.CharField(max_length=32)
    admission_date = models.DateField(auto_now_add=True)
    fourth_subject = models.ForeignKey(Subject, null=True, blank=True, on_delete=models.SET_NULL, related_name='fourth_subject_students')
    subjects = models.ManyToManyField(Subject, blank=True, related_name='students')
    note = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['session', 'class_name', 'roll_number']

    def __str__(self):
        return f'{self.full_name} ({self.session} {self.class_name})'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'.strip()


class FeePayment(models.Model):
    FEE_TYPE_CHOICES = [
        ('Admission', 'Admission'),
        ('Tuition', 'Tuition'),
        ('Exam', 'Exam'),
        ('Other', 'Other'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='payments')
    fee_type = models.CharField(max_length=32, choices=FEE_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_at = models.DateField(auto_now_add=True)
    note = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['-paid_at']

    def __str__(self):
        return f'{self.student} {self.fee_type} {self.amount}'


class Exam(models.Model):
    EXAM_TYPE_CHOICES = [
        ('Mid', 'Mid Term'),
        ('Half Yearly', 'Half Yearly'),
        ('Pre Test', 'Pre Test'),
        ('Test', 'Test'),
    ]

    name = models.CharField(max_length=120)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES)
    session = models.CharField(max_length=20)
    date = models.DateField()

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f'{self.name} ({self.session})'


class Mark(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='marks')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='marks')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    obtained_marks = models.DecimalField(max_digits=5, decimal_places=2)
    full_marks = models.DecimalField(max_digits=5, decimal_places=2, default=100)

    class Meta:
        unique_together = ('student', 'exam', 'subject')
        ordering = ['student', 'exam', 'subject']

    def __str__(self):
        return f'{self.student} {self.subject} {self.obtained_marks}/{self.full_marks}'
