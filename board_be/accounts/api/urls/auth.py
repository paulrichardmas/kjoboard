from django.urls import path
from accounts.api.views.auth_view import RegisterView, LoginView

urlpatterns = [
  path("register/", RegisterView.as_view()),
  path("login/", LoginView.as_view())
]
