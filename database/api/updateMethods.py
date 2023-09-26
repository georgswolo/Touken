from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from base.models import Avatar, User, Room, Task, Notice, Priority
from .serializers import UserSerializer, AvatarSerializer, RoomSerializer, TaskSerializer, NoticeSerializer, PrioritySerializer

# ALL GET METHOD
@api_view(['PUT'])
def updateUser(request):
    '''
        Get all users if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    # serializer = UserSerializer(data = request.data)
    # if serializer.is_valid():
    #     serializer.save()
    # return Response(serializer.data)

    try: 
        id = request.query_params['id']
        user = User.objects.get(user_id = id)
        serializer = UserSerializer(user, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)

@api_view(['PUT'])
def updateAvatar(request):
    '''
        Get all avatars if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        avatar = Avatar.objects.get(avatar_id = id)
        serializer = AvatarSerializer(avatar, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)

@api_view(['PUT'])
def updateTask(request):
    '''
        Get all tasks if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        task = Task.objects.get(task_id = id)
        serializer = TaskSerializer(task, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)

@api_view(['PUT'])
def updateNotice(request):
    '''
        Get all notices if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        notice = Task.objects.get(notice_id = id)
        serializer = TaskSerializer(notice, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)

@api_view(['PUT'])
def updatePriority(request):
    '''
        Get all priorities if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        priority = Priority.objects.get(prio_id = id)
        serializer = PrioritySerializer(priority, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)

@api_view(['PUT'])
def updateRoom(request):
    '''
        Get all rooms if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        room = Room.objects.get(room_id = id)
        serializer = RoomSerializer(room, data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except:
        return Response(None)
