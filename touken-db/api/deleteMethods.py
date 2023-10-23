from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from base.models import Avatar, User, Room, Task, Notice, Priority, TaskStatus
from .serializers import UserSerializer, AvatarSerializer, RoomSerializer, TaskSerializer, NoticeSerializer, PrioritySerializer, TaskStatusSerializer

@api_view(['DELETE'])
def deleteTaskStatus(request):
    '''
        Get all users if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        print(id)
        task_status = TaskStatus.objects.get(status_id = id)
        task_status.delete()
    except:
        return Response(None)