from rest_framework.serializers import ModelSerializer
from accounts.models import User

class UserResponseSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')