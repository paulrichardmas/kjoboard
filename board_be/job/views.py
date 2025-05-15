from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from job.models import Job
from core.decorators.auth_decorator import protected_view_cbv
from core.decorators.profile_decorator import require_profile_cbv
from job.serializer import JobCreateSerializer, JobRepositorySerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

@require_profile_cbv
class JobView(APIView):
  @swagger_auto_schema(
    responses={201: openapi.Response('Profile Fetched', JobRepositorySerializer)},
    operation_description="Fetch jobs with profile",
    tags=['Job']
  )
  def get(self, request, profile_id):
    try:
      jobs = Job.objects.filter(profile_id = profile_id)
      serializer = JobRepositorySerializer(jobs, many=True)
      return Response(serializer.data, status=status.HTTP_200_OK)

    except:
      return Response({"error": "No job"}, status=status.HTTP_400_BAD_REQUEST)
  
@protected_view_cbv
@require_profile_cbv
class JobCreateView(APIView):
  @swagger_auto_schema(
    request_body=JobCreateSerializer,
    responses={201: openapi.Response('Job created', JobRepositorySerializer)},
    operation_description="Create a job",
    tags=['Job']
  )
  def post(self, request, profile_id=None):
    try:
      serializer = JobCreateSerializer(data=request.data, context={'profile': profile_id})
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
      else:
        return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    except:
      return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    