import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Prompt(models.Model):
  prompt_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  text = models.TextField()
  default = models.BooleanField(default=False)

class PromptFields(models.Model):
  prompt_field_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.TextField(blank=True)
  field = models.TextField()