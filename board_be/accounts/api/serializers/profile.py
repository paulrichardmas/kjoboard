from rest_framework.serializers import ModelSerializer, ValidationError
from accounts.models.profile import Profile, Company, Education
from accounts.models.user import User
from .accounts_serializers import UserResponseSerializer
from job.serializer import JobRepositorySerializer
from job.models import Job

class CompanySerializer(ModelSerializer):
  class Meta:
    model = Company
    fields = ["company_name", "company_description", "start_date", "end_date"]

class EducationSerializer(ModelSerializer):
  class Meta:
    model = Education
    fields = ["university_name", "degree", "start_date", "end_date"]

class ProfileRepositorySerializer(ModelSerializer):
  user = UserResponseSerializer()
  education = EducationSerializer()
  companies = CompanySerializer(many=True, required=False)
  class Meta:
    model = Profile
    fields = ["profile_id", "user", "name", "title", "email", "phone", "bio", "companies", "education"]

class ProfileCreateSerializer(ModelSerializer):
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
        education=education
      )

      for company_data in companies_data:
        company = Company.objects.create(**company_data)
        profile.companies.add(company)

      return profile
    except:
      raise ValidationError("Cannot find the user")

class ProfilePatchSerializer(ModelSerializer):
  education = EducationSerializer()
  companies = CompanySerializer(many=True, required=False)

  class Meta:
    model=Profile
    fields=("name", "title", "email", "phone", "bio", "companies", "education")
    extra_kwargs = {
        "name": {"required": False},
        "title": {"required": False},
        "email": {"required": False},
        "phone": {"required": False},
        "bio": {"required": False},
        "companies": {"required": False},
        "education": {"required": False},
    }

  def update(self, instance, validated_data):
    education_data = validated_data.pop("education", None)
    if education_data:
      education = instance.education
      for attr, value in education_data.items():
        setattr(education, attr, value)
      education.save()

    companies_data = validated_data.pop("companies", None)
    if companies_data is not None:
        instance.companies.clear()
        for company_data in companies_data:
            company_id = company_data.get("company_id")
            if company_id:
                # Try updating existing company
                company = Company.objects.filter(company_id=company_id).first()
                if company:
                    for attr, value in company_data.items():
                        setattr(company, attr, value)
                    company.save()
                else:
                    company = Company.objects.create(**company_data)
            else:
                company = Company.objects.create(**company_data)

            instance.companies.add(company)

    for attr in ["name", "title", "email", "phone", "bio"]:
      if attr in validated_data:
          setattr(instance, attr, validated_data[attr])

    instance.save()
    return instance