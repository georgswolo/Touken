from rest_framework import serializers
from base.models import Item, Avatar, User, Room, Task, Notice, Priority

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = "__all__"

class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = "__all__"
