from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from core.decorators.auth_decorator import protected_view_cbv
from .serializers import PlatformRepositorySerializer, PlatformCreateSerializer, PlatformDetailWithURLSerializer, PlatformModel
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

@protected_view_cbv
class PlatformView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('Platforms Fetched', PlatformRepositorySerializer)},
    operation_description="Fetch all platforms",
    tags=['Platform']
  )
  def get(self, request):
    platforms = PlatformModel.objects.all()
    serializer = PlatformRepositorySerializer(platforms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  

  @swagger_auto_schema(
    request_body=PlatformCreateSerializer,
    responses={200: openapi.Response('Platform Created', PlatformRepositorySerializer)},
    operation_description="Create a platform",
    tags=['Platform']
  )
  def post(self, request):
    try:
      serializer = PlatformCreateSerializer(data=request.data)
      if serializer.is_valid():
        platform = serializer.save()
        return Response(PlatformRepositorySerializer(platform).data, status=status.HTTP_200_OK)
      else:
        return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    except:
      return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    
@protected_view_cbv
class PlatformDetailView(APIView):
  @swagger_auto_schema(
    request_body=PlatformDetailWithURLSerializer,
    responses={200: openapi.Response('Platform Fetched', PlatformRepositorySerializer)},
    operation_description="Fetch a platform with platform id",
    tags=['Platform']
  )
  def post(self, request):
    try:
      platform = PlatformModel.objects.get(platform_url=request.data["platform_url"])
      serializer = PlatformRepositorySerializer(platform)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Not found platform"}, status=status.HTTP_400_BAD_REQUEST)
