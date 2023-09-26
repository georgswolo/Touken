from django.urls import path
from . import views, getMethods, updateMethods, addMethods

urlpatterns = [
    # All add urls go here
    path('users/add/', addMethods.addUser),
    path('avatars/add/', addMethods.addAvatar),
    path('tasks/add/', addMethods.addTask),
    path('notices/add/', addMethods.addNotice),
    path('priorities/add/', addMethods.addPriority),
    path('rooms/add/', addMethods.addRoom),
    # All get urls go here
    path('users/', getMethods.getUser),
    path('avatars/', getMethods.getAvatar),
    path('tasks/', getMethods.getTask),
    path('notices/', getMethods.getNotice),
    path('priorities/', getMethods.getPriority),
    path('rooms/', getMethods.getRoom),
    # All update urls go here
    path('users/update/', updateMethods.updateUser),
    path('avatars/update/', updateMethods.updateAvatar),
    path('tasks/update/', updateMethods.updateTask),
    path('notices/update/', updateMethods.updateNotice),
    path('priorities/update/', updateMethods.updatePriority),
    path('rooms/update/', updateMethods.updateRoom),
]