# Generated by Django 4.2.5 on 2023-09-25 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_avatar_room_user_task_priority_notice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avatar',
            name='avatar_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
