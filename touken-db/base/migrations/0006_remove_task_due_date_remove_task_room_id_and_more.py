# Generated by Django 4.2.6 on 2023-10-14 06:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0005_rename_desciption_notice_description_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="task",
            name="due_date",
        ),
        migrations.RemoveField(
            model_name="task",
            name="room_id",
        ),
        migrations.RemoveField(
            model_name="task",
            name="task_type",
        ),
        migrations.RemoveField(
            model_name="task",
            name="user_id",
        ),
        migrations.CreateModel(
            name="TaskStatus",
            fields=[
                ("status_id", models.AutoField(primary_key=True, serialize=False)),
                ("start_date", models.DateTimeField()),
                ("completed", models.BooleanField()),
                (
                    "task_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="base.task"
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="base.user",
                    ),
                ),
            ],
        ),
    ]
