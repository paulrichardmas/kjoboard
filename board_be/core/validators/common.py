import re
from rest_framework import serializers

class PasswordValidator:
    def __init__(self, min_length=8):
        self.min_length = min_length

    def __call__(self, value):
        if len(value) < self.min_length:
            raise serializers.ValidationError(f"Password must be at least {self.min_length} characters long.")

        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")

        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")

        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")

        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
