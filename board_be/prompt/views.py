from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from core.decorators.auth_decorator import protected_view_cbv
from .serializer import PromptCreateSerializer, PromptRepositorySerializer, PromptFieldRpositorySerializer
from .models import Prompt, PromptFields
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from core.statics.prompt import prompt_fields

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
  
@swagger_auto_schema(
    method='get',
    operation_description='Prompt Fields',
    tags=['Prompt'],
    responses={200: openapi.Response('List of prompt fields', schema=openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Items(type=openapi.TYPE_STRING)
    ))}
)
@api_view(['get'])
def get_prompt_fields(request):
  prompts = PromptFields.objects.all()

  return Response((field["name"] for field in PromptFieldRpositorySerializer(prompts, many=True).data), status=status.HTTP_200_OK)