from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)


class Avatar(models.Model):
    avatar_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    source = models.CharField(max_length=200) # file name

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    avatar_id = models.ForeignKey(Avatar, on_delete=models.CASCADE)
    coins = models.PositiveIntegerField(default=0)

class Room(models.Model):
    room_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    colour = models.CharField(max_length=7) # hex color
    icon = models.CharField(max_length=200)
    note = models.CharField(max_length=500)

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    coins = models.PositiveIntegerField() 
    frequency =  models.FloatField() #hour-based

class TaskStatus(models.Model):
    status_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    completed = models.BooleanField() 
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank = True, null = True)

class Notice(models.Model):
    notice_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

class Priority(models.Model):
    prio_id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

