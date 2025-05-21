from rest_framework.serializers import ModelSerializer
from .models import Prompt, PromptFields

class PromptRepositorySerializer(ModelSerializer):
  class Meta:
    model=Prompt
    fields=['prompt_id', 'text', 'default']

class PromptCreateSerializer(ModelSerializer):

  class Meta:
    model=Prompt
    fields=['text']

  def create(self, validated_data):
    prompt = Prompt.objects.create(text=validated_data['text'], default=False)
    return prompt
  
class PromptUpdateSerializer(ModelSerializer):
  class Meta:
    model=Prompt
    fields=['text']
  
  def update(self, instance, validated_data):
    instance.text = validated_data['text']
    instance.save()
    return instance
  
class PromptFieldRpositorySerializer(ModelSerializer):
  class Meta:
    model=PromptFields
    fields=['field', 'name']