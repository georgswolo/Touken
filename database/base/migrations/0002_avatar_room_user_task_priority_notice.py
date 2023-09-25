# Generated by Django 4.2.5 on 2023-09-25 14:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Avatar',
            fields=[
                ('avatar_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('source', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('room_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('colour', models.CharField(max_length=7)),
                ('icon', models.CharField(max_length=200)),
                ('note', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('avatar_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.avatar')),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('task_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('desciption', models.CharField(max_length=500)),
                ('coins', models.PositiveIntegerField()),
                ('due_date', models.DateTimeField()),
                ('frequency', models.PositiveIntegerField()),
                ('task_type', models.BooleanField()),
                ('room_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.room')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.user')),
            ],
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('prio_id', models.AutoField(primary_key=True, serialize=False)),
                ('desciption', models.CharField(max_length=500)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.user')),
            ],
        ),
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('notice_id', models.AutoField(primary_key=True, serialize=False)),
                ('desciption', models.CharField(max_length=500)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.user')),
            ],
        ),
    ]
