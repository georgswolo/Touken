from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Avatar, User, Room, Task, Notice, Priority
from .serializers import UserSerializer, AvatarSerializer, RoomSerializer, TaskSerializer, NoticeSerializer, PrioritySerializer

# ALL GET METHOD
@api_view(['GET'])
def getUser(request):
    '''
        Get all users if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        user = User.objects.get(user_id = id)
        serializer = UserSerializer(user)
    except:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAvatar(request):
    '''
        Get all avatars if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        avatar = Avatar.objects.get(avatar_id = id)
        serializer = AvatarSerializer(avatar)
    except:
        avatars = Avatar.objects.all()
        serializer = AvatarSerializer(avatars, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTask(request):
    '''
        Get all tasks if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        task = Task.objects.get(task_id = id)
        serializer = TaskSerializer(task)
    except:
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNotice(request):
    '''
        Get all notices if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        notice = Notice.objects.get(notice_id = id)
        serializer = NoticeSerializer(notice)
    except:
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPriority(request):
    '''
        Get all priorities if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        priority = Priority.objects.get(prio_id = id)
        serializer = PrioritySerializer(priority)
    except:
        priorities = Priority.objects.all()
        serializer = PrioritySerializer(priorities, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRoom(request):
    '''
        Get all rooms if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    try: 
        id = request.query_params['id']
        room = Room.objects.get(room_id = id)
        serializer = RoomSerializer(room)
    except:
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
    return Response(serializer.data)
