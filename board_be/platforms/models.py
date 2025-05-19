import uuid
from django.db import models

class PlatformModel(models.Model):
  platform_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.TextField()
  platform_url = models.URLField()
  url = models.TextField()
  company = models.TextField()
  title = models.TextField()
  location = models.TextField()
  description = models.TextField()
  applications = models.TextField()
  posted_date = models.TextField()
  