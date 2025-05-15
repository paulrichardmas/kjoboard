from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from django.contrib.auth.hashers import make_password, check_password
from accounts.models.user import User
from core.validators.common import PasswordValidator

class RegisterSerializer(ModelSerializer):
  password = CharField(
    write_only = True,
    validators=[PasswordValidator()]
  )

  class Meta:
    model = User
    fields = ('username', 'password')

  def create(self, validated_data):
    password = validated_data['password']
    hashed_password = make_password(password)
    user = User.objects.create(
      username=validated_data["username"],
      password = hashed_password
    )
    return user

class LoginSerializer(ModelSerializer):
  username = CharField()
  password = CharField(write_only=True)

  class Meta:
    model = User
    fields = ('username', 'password')

  def validate(self, data):
    username = data["username"]
    password = data["password"]

    try:
      user = User.objects.get(username = username)
    except User.DoesNotExist:
      raise ValidationError("Invalid username or password")
    
    if not check_password(password, user.password):
      raise ValidationError("Invalid username or password")
    
    data['user'] = user
    return data
  