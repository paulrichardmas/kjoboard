from .views import PlatformView, PlatformDetailView
from django.urls import path

urlpatterns = [
  path("", PlatformView.as_view(), name="platform"),
  path("detail/", PlatformDetailView.as_view(), name="platform")
]