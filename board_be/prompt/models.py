import uuid
from django.db import models

class Prompt(models.Model):
  prompt_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  text = models.TextField()
  default = models.BooleanField(default=False)