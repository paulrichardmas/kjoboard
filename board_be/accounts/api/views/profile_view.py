from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from core.decorators.auth_decorator import protected_view_cbv
from accounts.api.serializers.profile import ProfileSerializer

@protected_view_cbv
class ProfileView(APIView):
  def get(self, request):
    return Response({"data": "success"})
  
  @swagger_auto_schema(
    request_body=ProfileSerializer,
    responses={201: openapi.Response('User created', ProfileSerializer)},
    operation_description="Create a profile",
    tags=['Profile']
  )
  def post(self, request):
    serializer = ProfileSerializer(data=request.data, context={"user": request.user.user_id})
    if serializer.is_valid():
      serializer.save()
      return Response({"profile": serializer.data}, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid params"}, status=status.HTTP_400_BAD_REQUEST)
