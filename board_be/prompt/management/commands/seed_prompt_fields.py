from django.core.management.base import BaseCommand
from prompt.models import PromptFields
import uuid
from core.statics.prompt import prompt_fields

class Command(BaseCommand):
  help = 'Seed or update PromptFields'

  def handle(self, *args, **kwargs):
    PromptFields.objects.all().delete()

    for (key, value) in prompt_fields.items():
      PromptFields.objects.create(prompt_field_id=uuid.uuid4(), field=value, name=key)

    self.stdout.write(self.style.SUCCESS('PromptFields seeded successfully.'))
