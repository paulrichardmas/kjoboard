from  uuid import UUID
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import UntypedToken, AccessToken
from django.utils.deprecation import MiddlewareMixin
from accounts.models.user import User

class TokenAuthenticationMiddleware(MiddlewareMixin):
  def process_request(self, request):
    auth_header = request.META.get('HTTP_AUTHORIZATION')
    if auth_header is None or not auth_header.startswith('Bearer '):
      request.user = None
      return
    
    token = auth_header.split(' ')[1]

    try:
      UntypedToken(token)

      user_id = AccessToken(token)['user_id']

      try:
        user = User.objects.get(id=UUID(user_id))
        request.user = user
      except:
        return JsonResponse({'error': 'Invalid token'}, status=401)
   
    except:
      return JsonResponse({'error': 'Invalid token'}, status=401)