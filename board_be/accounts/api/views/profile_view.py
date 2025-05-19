from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from core.decorators.auth_decorator import protected_view_cbv
from accounts.api.serializers.profile import ProfileCreateSerializer, ProfilePatchSerializer, ProfileRepositorySerializer
from accounts.models.profile import Profile

@protected_view_cbv
class ProfileListCreateView(APIView):
  @swagger_auto_schema(
    responses={201: openapi.Response('Profile list', ProfileRepositorySerializer)},
    operation_description="Get all profiles",
    tags=['Profile']
  )
  def get(self, request):
    try:
      profiles = Profile.objects.all()
      serializer = ProfileRepositorySerializer(profiles, many=True)
      return Response({"profiles": serializer.data}, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Cannot fetch profiles"}, status=status.HTTP_400_BAD_REQUEST)
  
  @swagger_auto_schema(
    request_body=ProfileCreateSerializer,
    responses={201: openapi.Response('Profile created', ProfileRepositorySerializer)},
    operation_description="Create a profile",
    tags=['Profile']
  )
  def post(self, request):
    serializer = ProfileCreateSerializer(data=request.data, context={"user": request.user.user_id})
    if serializer.is_valid():
      serializer.save()
      return Response({"profile": serializer.data}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
  

@protected_view_cbv
class ProfileDetailView(APIView):
  @swagger_auto_schema(
    manual_parameters=[
      openapi.Parameter(
                'profile_id',
                openapi.IN_PATH,
                description="Profile ID to fetch",
                type=openapi.TYPE_STRING,  # or TYPE_UUID if supported
                format='uuid')
    ],
    responses={201: openapi.Response('Profile', ProfileRepositorySerializer)},
    operation_description="Fetch a profile",
    tags=['Profile'],
    request_body_kwargs={'partial': True}
  )
  def get(self, request, profile_id=None):
    try:
      profile = Profile.objects.get(profile_id = profile_id)
      serializer = ProfileRepositorySerializer(profile)
      return Response(serializer.data, status=status.HTTP_200_OK)
    except:
      return Response({"error": "Cannot fetch profiles"}, status=status.HTTP_400_BAD_REQUEST)


  @swagger_auto_schema(
    manual_parameters=[
      openapi.Parameter(
                'profile_id',
                openapi.IN_PATH,
                description="Profile ID to update",
                type=openapi.TYPE_STRING,  # or TYPE_UUID if supported
                format='uuid')
    ],
    request_body=ProfilePatchSerializer,
    responses={201: openapi.Response('Profile Updated', ProfileRepositorySerializer)},
    operation_description="Update a profile",
    tags=['Profile'],
    request_body_kwargs={'partial': True}
  )
  def patch(self, request, profile_id=None):
    try:
      profile = Profile.objects.get(profile_id=profile_id)
    except Profile.DoesNotExist:
        raise NotFound("Profile not found.")

    serializer = ProfilePatchSerializer(profile, data=request.data, partial=True, context={"user": request.user.id})
    if serializer.is_valid():
        profile = serializer.save()
        return Response(ProfileRepositorySerializer(profile).data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
