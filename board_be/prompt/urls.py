from django.urls import path
from .views import PromptView, PromptDetailView, get_prompt_fields

urlpatterns = [
  path("", PromptView.as_view(), name="prompt-view"),
  path("<uuid:prompt_id>/", PromptDetailView.as_view(), name="prompt-detail"),
  path("fields/", get_prompt_fields, name="prompt-fields")
]