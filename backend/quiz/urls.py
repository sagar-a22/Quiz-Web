from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, QuestionViewSet, AnswerViewSet, UserAnswerViewSet, AuthViewSet

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)
router.register(r'useranswers', UserAnswerViewSet)
router.register(r'auth', AuthViewSet, basename='auth') 

urlpatterns = [
    path('api/', include(router.urls)),  # API endpoints for quizzes, questions, etc.
    path('api/auth/', include('djoser.urls')),  # User management (register, reset password, etc.)
    path('api/auth/', include('djoser.urls.jwt')),  # JWT authentication endpoints (login/logout/refresh)
]
