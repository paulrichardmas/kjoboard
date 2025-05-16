import uuid
from django.db import models
from accounts.models.user import User
from accounts.models.profile import Profile

class Job(models.Model):
  class Status(models.TextChoices):
    NOT_APPLIED = 'not-applied'
    APPLIED = 'applied'
    PASSED = 'passed'
    FAILED = 'failed'
  job_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  url = models.URLField(blank=True)
  company = models.TextField(blank=True)
  title = models.TextField(blank=True)
  location = models.TextField(blank=True)
  description = models.TextField(blank=True)
  applications = models.IntegerField(blank=True)
  posted_date = models.DateField(blank=True)
  status = models.CharField(max_length=20, choices=Status.choices, default=Status.NOT_APPLIED)
  profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
  prompt = models.TextField(blank=True)
  resume_path = models.TextField(blank=True)