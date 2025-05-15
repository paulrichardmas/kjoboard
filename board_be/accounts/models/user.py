import uuid
from django.db import models

class User(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  username = models.CharField(max_length=100, unique=True)
  password = models.CharField(max_length=255)
  created_on = models.DateTimeField(auto_now=True)
