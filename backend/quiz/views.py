from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from .models import Quiz, Question, Answer, UserAnswer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer, UserAnswerSerializer


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        """Fetch all questions for a specific quiz"""
        quiz = get_object_or_404(Quiz, pk=pk)
        questions = quiz.questions.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class UserAnswerViewSet(viewsets.ModelViewSet):
    queryset = UserAnswer.objects.all()
    serializer_class = UserAnswerSerializer

    def create(self, request, *args, **kwargs):
        question_id = request.data.get("question")
        user_answer_text = request.data.get("answer_text")
        user = request.user  # Get logged-in user

        try:
            question = Question.objects.get(id=question_id)
            correct_answer = Answer.objects.filter(question=question, is_correct=True).first()

            is_correct = correct_answer and correct_answer.text.strip().lower() == user_answer_text.strip().lower()

            # Assign score (e.g., 10 points per correct answer)
            score = 10 if is_correct else 0

            # Save the user's answer
            user_answer = UserAnswer.objects.create(
                question=question,
                user=user,
                answer_text=user_answer_text,
                score=score
            )

            return Response({
                "question": question.text,
                "submitted_answer": user_answer_text,
                "correct_answer": correct_answer.text if correct_answer else "No correct answer set",
                "is_correct": is_correct,
                "score": score
            }, status=status.HTTP_201_CREATED)

        except Question.DoesNotExist:
            return Response({"error": "Invalid question ID"}, status=status.HTTP_400_BAD_REQUEST)


class AuthViewSet(ViewSet):

    @action(detail=False, methods=["post"], url_path="register")
    def register(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=username,
            password=make_password(password)  # Hash password before saving
        )

        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=["post"], url_path="login")
    def login(self, request):
        from django.contrib.auth import authenticate

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_200_OK
        )

    @action(detail=False, methods=["post"], url_path="logout")
    def logout(self, request):
        """Blacklist the refresh token to log out the user"""
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist token so it can't be reused
                return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
            return Response({"error": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)