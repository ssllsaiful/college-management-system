from django.db import models

class Teacher(models.Model):
    pds_id = models.CharField(max_length=50, unique=True, verbose_name="PDS ID")
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255, verbose_name="Post")
    subject = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    profile_picture = models.ImageField(upload_to='teachers_profile/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.designation}"
