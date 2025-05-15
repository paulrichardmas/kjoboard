from django.urls import path
from accounts.api.views.profile_view import ProfileView

urlpatterns = [
  path("profile/", ProfileView.as_view())
]