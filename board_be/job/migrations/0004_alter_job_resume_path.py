# Generated by Django 5.2.1 on 2025-05-16 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0003_job_resume_path_alter_job_posted_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='resume_path',
            field=models.TextField(blank=True),
        ),
    ]
