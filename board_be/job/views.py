from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from job.models import Job
from prompt.models import Prompt
from accounts.models.profile import Profile
from core.decorators.auth_decorator import protected_view_cbv
from core.decorators.profile_decorator import require_profile_cbv
from job.serializer import JobCreateSerializer, JobRepositorySerializer, JobStatusUpdateSerializer, JobCheckSerializer, JobApplySerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
  
@protected_view_cbv
@require_profile_cbv
class JobListCreateView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('Profile Fetched', JobRepositorySerializer)},
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
    
@protected_view_cbv
class JobDetailView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('A Profile Fetched', JobRepositorySerializer)},
    operation_description="Fetch a job with job_id",
    tags=['Job']
  )
  def get(self, request, job_id):
    try:
      jobs = Job.objects.get(job_id = job_id)
      serializer = JobRepositorySerializer(jobs)
      return Response(serializer.data, status=status.HTTP_200_OK)

    except:
      return Response({"error": "No job"}, status=status.HTTP_400_BAD_REQUEST)
    
@protected_view_cbv
@require_profile_cbv
class JobUpdateView(APIView):
  @swagger_auto_schema(
    request_body=JobStatusUpdateSerializer,
    responses={200: openapi.Response('Update Job status', JobRepositorySerializer)},
    operation_description="Update job status",
    tags=['Job']
  )
  def patch(self, request, profile_id, job_id):
    try:
      if request.data["status"] == Job.Status.APPLIED:
        return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
      job=Job.objects.get(job_id=job_id)
      job.status=request.data["status"]
      job.save()

      return Response(JobRepositorySerializer(job).data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    
@protected_view_cbv
@require_profile_cbv
class JobApplyView(APIView):
  @swagger_auto_schema(
    request_body=JobApplySerializer,
    responses={200: openapi.Response('Apply to a job', JobRepositorySerializer)},
    operation_description="Apply to a job",
    tags=['Job']
  )
  def post(self, request, profile_id, job_id):
    try:
      job=Job.objects.get(job_id=job_id)
      job.status=Job.Status.APPLIED
      job.resume_path=request.data["resume_path"]
      job.save()

      return Response(JobRepositorySerializer(job).data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
    
@protected_view_cbv
@require_profile_cbv
class JobCheckView(APIView):
  @swagger_auto_schema(
    request_body=JobCheckSerializer,
    responses={200: openapi.Response('Check job with link', JobRepositorySerializer)},
    operation_description="Check job with link",
    tags=['Job']
  )
  def post(self, request, profile_id):
    try:
      job=Job.objects.get(profile_id=profile_id, url=request.data['url'])

      return Response(JobRepositorySerializer(job).data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Not found job"}, status=status.HTTP_400_BAD_REQUEST)

@protected_view_cbv
@require_profile_cbv
class JobPromptGenView(APIView):
  @swagger_auto_schema(
    responses={200: openapi.Response('Check job with link', JobRepositorySerializer)},
    operation_description="Check job with link",
    tags=['Job']
  )
  def get(self, request, profile_id, job_id):
    try:
      prompt = Prompt.objects.get(default=True)
      profile = Profile.objects.get(profile_id=profile_id)
      job = Job.objects.get(job_id=job_id)

      print(prompt.text)

      promt_text = prompt.text.format(
        title=job.title,
        work_history=profile.work_history(),
        company_count=profile.companies.count(),
        name=profile.name,
        location=profile.location,
        phone_number=profile.phone,
        email=profile.email,
        education=profile.education_history(),
        job_description=job.description
      )

      job.prompt = promt_text
      job.save()

      return Response(JobRepositorySerializer(job).data, status=status.HTTP_200_OK)
    except Exception as e:
      print(e)
      return Response({"error": "Not found job"}, status=status.HTTP_400_BAD_REQUEST)
