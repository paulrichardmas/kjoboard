from functools import wraps
from django.http import JsonResponse

def protected_view(view_func):
  @wraps(view_func)
  def wrapper(request, *args, **kwargs):
    user = getattr(request, 'user', None)
    if not user:
      return JsonResponse({'error': 'Authentication required'}, status=401)
    return view_func(request, *args, **kwargs)
  return wrapper

def protected_view_cbv(cls):
  original_dispatch = cls.dispatch

  @wraps(original_dispatch)
  def dispatch_wrapper(self, request, *args, **kwargs):
    user = getattr(request, 'user', None)
    if not user:
      return JsonResponse({'error': 'Authentication required'}, status=401)
    return original_dispatch(self, request, *args, **kwargs)
  cls.dispatch = dispatch_wrapper
  return cls