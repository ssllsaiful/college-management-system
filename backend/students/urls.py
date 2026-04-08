from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ExamViewSet, FeePaymentViewSet, MarkViewSet, SubjectViewSet, StudentViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'students', StudentViewSet)
router.register(r'payments', FeePaymentViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'marks', MarkViewSet)

urlpatterns = [
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
    path('', include(router.urls)),
]
