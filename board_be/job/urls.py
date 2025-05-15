from django.urls import path
from job.views import JobCreateView, JobView

urlpatterns = [
  path("all/<uuid:profile_id>/", JobView.as_view(), name="job-list"),
  path("<uuid:profile_id>/", JobCreateView.as_view(), name="job-create"),
]