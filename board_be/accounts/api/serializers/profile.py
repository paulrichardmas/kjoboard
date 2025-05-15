from rest_framework.serializers import ModelSerializer, ValidationError
from accounts.models.profile import Profile, Company, Education
from accounts.models.user import User

class CompanySerializer(ModelSerializer):
  class Meta:
    model = Company
    fields = ["company_name", "company_description", "start_date", "end_date"]

class EducationSerializer(ModelSerializer):
  class Meta:
    model = Education
    fields = ["university_name", "degree", "start_date", "end_date"]

class ProfileSerializer(ModelSerializer):
  education = EducationSerializer()
  companies = CompanySerializer(many=True, required=False)

  class Meta:
    model=Profile
    fields=("name", "title", "email", "phone", "bio", "companies", "education")

  def create(self, validated_data):
    user_id = self.context.get("user")
    try:
      user = User.objects.get(id=user_id)
      education_data = validated_data["education"]
      companies_data = validated_data["companies"]

      education = Education.objects.create(**education_data)
      profile = Profile.objects.create(
        user=user,
        name=validated_data["name"],
        title=validated_data["title"],
        email=validated_data["email"],
        phone=validated_data["phone"],
        bio=validated_data["bio"],
        education=education,)

      for company_data in companies_data:
        company = Company.objects.create(**company_data)
        profile.companies.add(company)

      return profile
    except:
      raise ValidationError("Cannot find the user")