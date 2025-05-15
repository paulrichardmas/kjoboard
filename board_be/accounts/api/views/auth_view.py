from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.api.serializers.auth_serializers import RegisterSerializer, LoginSerializer
from accounts.api.serializers.accounts_serializers import UserResponseSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from core.decorators.auth_decorator import protected_view_cbv

def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
    'refresh': str(refresh),
    'access': str(refresh.access_token)
  }

@protected_view_cbv
class AuthView(APIView):
  def get(self, request):
    return Response({"data": "auth service", "user": request.user.username})

class RegisterView(APIView):
  @swagger_auto_schema(
    request_body=RegisterSerializer,
    responses={201: openapi.Response('User created', RegisterSerializer)},
    operation_description="Register a new user",
    tags=['Auth']
  )
  def post(self, request):
    serializer = RegisterSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({
        'user': serializer.data,
      }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class LoginView(APIView):
  @swagger_auto_schema(
    request_body=LoginSerializer,
    operation_description="Login with a user credential",
    tags=['Auth']
  )

  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.validated_data['user']
      tokens = get_tokens_for_user(user)
      return Response({'user': UserResponseSerializer(user).data, 'tokens': tokens}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)