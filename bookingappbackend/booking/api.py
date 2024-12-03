from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from booking.models import Room
from rest_framework import status
from .serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):
    # Specifies the serializer class to be used for this viewset
    serializer_class = RoomSerializer

    def get_permissions(self):
        # Sets permissions based on the action being performed
        if self.action in ['list', 'retrieve']:
            self.permission_classes = [AllowAny]  # Allow any user to list or retrieve rooms
        elif self.action in ['create', 'destroy']:
            self.permission_classes = [IsAuthenticated]  # Only authenticated users can create or destroy rooms
        else:
            self.permission_classes = [IsAuthenticated]  # Default to authenticated users for other actions
        return super().get_permissions()

    def get_queryset(self):
        # Returns the queryset of rooms based on the user's authentication status
        user = self.request.user
        print("get_queryset called") 
        if user.is_authenticated:
            # Retrieve only the rooms associated with the authenticated user
            room = Room.objects.filter(user_id=user.id)
        else:
            # Retrieve all rooms if the user is not authenticated
            room = Room.objects.all()
        return room

    def perform_create(self, serializer):
        # Saves a new room instance with the user_id set to the current authenticated user
        serializer.save(user_id=self.request.user)

    def destroy(self, request, *args, **kwargs):
        # Deletes a room instance
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)