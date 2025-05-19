from rest_framework.serializers import ModelSerializer, ValidationError
from .models import PlatformModel

class PlatformRepositorySerializer(ModelSerializer):
  class Meta:
    model = PlatformModel
    fields = ["platform_id", "name", 'platform_url', 'url', 'company', 'title', 'location', 'description', 'applications', 'posted_date']

class PlatformDetailWithURLSerializer(ModelSerializer):
  class Meta:
    model = PlatformModel
    fields = ["platform_url"]

class PlatformCreateSerializer(ModelSerializer):
  class Meta:
    model=PlatformModel
    fields = ['name', 'platform_url', 'url', 'company', 'title', 'location', 'description', 'applications', 'posted_date']

  def create(self, validated_data):
    try:
      platform = PlatformModel.objects.create(
        name=validated_data['name'],
        platform_url=validated_data['platform_url'],
        url=validated_data['url'],
        company=validated_data['company'],
        title=validated_data['title'],
        location=validated_data['location'],
        description=validated_data['description'],
        applications=validated_data['applications'],
        posted_date=validated_data['posted_date'],
      )
      return platform
    except Exception as e:
      raise ValidationError("Invalid Params ({e})")