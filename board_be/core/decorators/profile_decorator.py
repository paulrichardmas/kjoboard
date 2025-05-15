from functools import wraps
from django.http import JsonResponse
from accounts.models.profile import Profile

def require_profile(view_func):
  @wraps(view_func)
  def wrapper(request, *args, **kwargs):
    user = getattr(request, 'user', None)
    profile_id = kwargs["profile_id"]
    if not user:
      return JsonResponse({'error': 'Authentication required'}, status=401)

    profile = Profile.objects.filter(profile_id = profile_id, user_id=user)
      
    if profile.count() == 0:
      return JsonResponse({"error": "User doesn't own the profile"}, status=400)

    return view_func(request, *args, **kwargs)
  return wrapper

def require_profile_cbv(cls):
  original_dispatch = cls.dispatch

  @wraps(original_dispatch)
  def dispatch_wrapper(self, request, *args, **kwargs):
    user = getattr(request, 'user', None)
    profile_id = kwargs["profile_id"]
    if not user:
      return JsonResponse({'error': 'Authentication required'}, status=401)
    if not profile_id:
      return JsonResponse({'error': 'Profile id is required'}, status=400)

    profile = Profile.objects.filter(profile_id=profile_id, user_id=user.id)
      
    if profile.count() == 0:
      return JsonResponse({"error": "User doesn't own the profile"}, status=400)

    return original_dispatch(self, request, *args, **kwargs)
  cls.dispatch = dispatch_wrapper
  return cls