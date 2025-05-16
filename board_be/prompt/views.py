from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.decorators.auth_decorator import protected_view_cbv
from .serializer import PromptCreateSerializer, PromptRepositorySerializer
from .models import Prompt
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

@protected_view_cbv
class PromptView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('Prompts fetch', PromptRepositorySerializer)},
    operation_description='Prompts fetch',
    tags=['Prompt']
  )
  def get(self, request):
    prompts = Prompt.objects.all()
    if not prompts:
      return Response([], status=status.HTTP_200_OK)
    serializer = PromptRepositorySerializer(prompts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  @swagger_auto_schema(
    request_body=PromptCreateSerializer,
    responses={200: openapi.Response('Prompt Created', PromptRepositorySerializer)},
    operation_description='Prompt Created',
    tags=['Prompt']
  )
  def post(self, request):
    serializer = PromptCreateSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
  
