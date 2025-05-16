from django.urls import path
from .views import PromptView

urlpatterns = [
  path("", PromptView.as_view(), name="prompt-view")
]