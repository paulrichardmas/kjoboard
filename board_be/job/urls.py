from django.urls import path
from job.views import JobListCreateView, JobDetailView, JobUpdateView, JobCheckView

urlpatterns = [
  path("<uuid:profile_id>/", JobListCreateView.as_view(), name="job-list"),
  path("detail/<uuid:job_id>/", JobDetailView.as_view(), name="job-detail"),
  path("status/<uuid:profile_id>/<uuid:job_id>/", JobUpdateView.as_view(), name="job-update-status"),
  path("check/<uuid:profile_id>/", JobCheckView.as_view(), name="job-check")
]