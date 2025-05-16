from rest_framework.serializers import ModelSerializer
from .models import Prompt, PromptFields

class PromptRepositorySerializer(ModelSerializer):
  class Meta:
    model=Prompt
    fields=['prompt_id', 'text', 'default']

class PromptCreateSerializer(ModelSerializer):

  class Meta:
    model=Prompt
    fields=['text', 'info']

  def create(self, validated_data):
    prompt = Prompt.objects.create(text=validated_data['text'], default=False, info=validated_data['info'])
    return prompt
  
class PromptFieldRpositorySerializer(ModelSerializer):
  class Meta:
    model=PromptFields
    fields=['field', 'name']