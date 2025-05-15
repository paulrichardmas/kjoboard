from django.urls import path
from accounts.api.views.profile_view import ProfileListCreateView, ProfileDetailView

urlpatterns = [
  path("profile/", ProfileListCreateView.as_view(), name="profile-list-create"),
  path("profile/<uuid:profile_id>", ProfileDetailView.as_view(), name="profile-detail")
]