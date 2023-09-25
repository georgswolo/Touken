from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)


class Avatar(models.Model):
    avatar_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    source = models.URLField(max_length=200)

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    avatar_id = models.ForeignKey(Avatar, on_delete=models.CASCADE)

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    colour = models.CharField(max_length=7) # hex color
    icon = models.CharField(max_length=200)
    note = models.CharField(max_length=500)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    desciption = models.CharField(max_length=500)
    coins = models.PositiveIntegerField()
    due_date = models.DateTimeField()
    frequency =  models.PositiveIntegerField()
    task_type = models.BooleanField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)

class Notice(models.Model):
    notice_id = models.AutoField(primary_key=True)
    desciption = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Priority(models.Model):
    prio_id = models.AutoField(primary_key=True)
    desciption = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

