from django.urls import path
from .views import PromptView, get_prompt_fields

urlpatterns = [
  path("", PromptView.as_view(), name="prompt-view"),
  path("fields/", get_prompt_fields, name="prompt-fields")
]