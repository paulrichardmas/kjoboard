# Generated by Django 5.2.1 on 2025-05-19 01:56

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PlatformModel',
            fields=[
                ('platform_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('platform_url', models.URLField()),
                ('url', models.TextField()),
                ('company', models.TextField()),
                ('title', models.TextField()),
                ('location', models.TextField()),
                ('description', models.TextField()),
                ('applications', models.TextField()),
                ('posted_date', models.TextField()),
            ],
        ),
    ]
