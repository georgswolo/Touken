from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Avatar, User, Room, Task, Notice, Priority
from .serializers import UserSerializer, AvatarSerializer, RoomSerializer, TaskSerializer, NoticeSerializer, PrioritySerializer

# ALL GET METHOD
@api_view(['POST'])
def addUser(request):
    '''
        Get all users if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addAvatar(request):
    '''
        Get all avatars if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = AvatarSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addTask(request):
    '''
        Get all tasks if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addNotice(request):
    '''
        Get all notices if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = NoticeSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addPriority(request):
    '''
        Get all priorities if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = PrioritySerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addRoom(request):
    '''
        Get all rooms if id not specified, get user by id otherwise
        :returns: the data associated
    '''
    serializer = RoomSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
