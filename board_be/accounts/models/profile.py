import uuid
from django.db import models
from .user import User

class Company(models.Model):
  company_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  company_name = models.TextField()
  company_description = models.TextField()
  start_date = models.DateField()
  end_date = models.DateField()

class Education(models.Model):
  education_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  university_name = models.TextField()
  degree = models.TextField()
  start_date = models.DateField()
  end_date = models.DateField()

class Profile(models.Model):
  profile_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=255)
  location = models.TextField(blank=True)
  linkedin_url = models.URLField(blank=True)
  title = models.TextField()
  email = models.EmailField()
  phone = models.TextField(blank=True)
  bio = models.TextField()
  companies = models.ManyToManyField(Company, blank=True)
  education = models.ForeignKey(Education, on_delete=models.CASCADE)

  def work_history(self):
    return ", ".join(f"{company.company_name} ({company.start_date} - {company.end_date})" for company in self.companies.all())

  def education_history(self):
    return f"{self.education.university_name} | {self.education.degree}  ({self.education.start_date} - {self.education.end_date})"
