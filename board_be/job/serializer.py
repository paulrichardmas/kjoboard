from rest_framework.serializers import ModelSerializer, ValidationError
from job.models import Job
from accounts.models.profile import Profile

class JobRepositorySerializer(ModelSerializer):
  class Meta:
    model=Job
    fields=["job_id", "company", "title", "location", "description", "applications", "posted_date", "applied_date", "status", "prompt", "url", "resume_path"]

class JobStatusUpdateSerializer(ModelSerializer):
  class Meta:
    model=Job
    fields=["status"]

class JobApplySerializer(ModelSerializer):
  class Meta:
    model=Job
    fields=["resume_path"]


class JobCheckSerializer(ModelSerializer):
  class Meta:
    model=Job
    fields=["url"]

class JobCreateSerializer(ModelSerializer):
  class Meta:
    model=Job
    fields=["url", "company", "title", "location", "description", "applications", "posted_date"]

  def create(self, validated_data):
    profile_id = self.context.get("profile")
    try:
      profile = Profile.objects.get(profile_id=profile_id)
      job = Job.objects.create(
        url=validated_data['url'],
        company=validated_data['company'],
        title=validated_data['title'],
        location=validated_data['location'],
        description=validated_data['description'],
        applications=validated_data['applications'],
        posted_date=validated_data['posted_date'],
        profile=profile
      )

      return job
    except:
      raise ValidationError("Cannot find profile")