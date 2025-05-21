from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.exceptions import NotFound
from core.decorators.auth_decorator import protected_view_cbv, protected_view
from .serializer import PromptCreateSerializer, PromptRepositorySerializer, PromptFieldRpositorySerializer, PromptUpdateSerializer
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
      prompt = serializer.save()
      return Response(PromptRepositorySerializer(prompt).data, status=status.HTTP_200_OK)
    return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
  
@protected_view_cbv
class PromptDetailView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('Prompt fetch', PromptRepositorySerializer)},
    operation_description='Prompt fetch with prompt id',
    tags=['Prompt']
  )
  def get(self, request, prompt_id):
    print(prompt_id)
    try:
      prompt = Prompt.objects.get(prompt_id=prompt_id)
      serializer = PromptRepositorySerializer(prompt)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Invalid prompt id"}, status=status.HTTP_400_BAD_REQUEST)
    
  @swagger_auto_schema(
    manual_parameters=[
      openapi.Parameter(
                'prompt_id',
                openapi.IN_PATH,
                description="Prompt ID to update",
                type=openapi.TYPE_STRING,  # or TYPE_UUID if supported
                format='uuid')
    ],
    request_body=PromptUpdateSerializer,
    responses={201: openapi.Response('Prompt Updated', PromptRepositorySerializer)},
    operation_description="Update a Prompt",
    tags=['Prompt'],
    request_body_kwargs={'partial': True}
  )
  def patch(self, request, prompt_id):
    try:
      prompt = Prompt.objects.get(prompt_id=prompt_id)
    except prompt.DoesNotExist:
        raise NotFound("prompt not found.")

    serializer = PromptUpdateSerializer(prompt, data=request.data)
    if serializer.is_valid():
        prompt = serializer.save()
        return Response(PromptRepositorySerializer(prompt).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
  
  @swagger_auto_schema(
    manual_parameters=[
      openapi.Parameter(
                'prompt_id',
                openapi.IN_PATH,
                description="Prompt ID to delete",
                type=openapi.TYPE_STRING,  # or TYPE_UUID if supported
                format='uuid')
    ],
    request_body=PromptUpdateSerializer,
    responses={201: openapi.Response('Prompt Deleted')},
    operation_description="Prompt Deleted",
    tags=['Prompt'],
    request_body_kwargs={'partial': True}
  )
  def delete(self, request, prompt_id):
    try:
      prompt = Prompt.objects.get(prompt_id=prompt_id)
      prompt.delete()
      return Response({"success": True}, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Invalid prompt id"}, status=status.HTTP_400_BAD_REQUEST)  
  
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
@protected_view
def get_prompt_fields(request):
  prompts = PromptFields.objects.all()

  return Response((field["name"] for field in PromptFieldRpositorySerializer(prompts, many=True).data), status=status.HTTP_200_OK)