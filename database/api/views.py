from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item, Avatar, User, Room, Task, Notice, Priority
from .serializers import ItemSerializer, UserSerializer, AvatarSerializer, RoomSerializer, TaskSerializer, NoticeSerializer, PrioritySerializer

@api_view(['GET'])
def getData(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

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


# ALL POST METHODS
@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addData(request):
    serializer = ItemSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
