from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from booking.models import Room
from .serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):  # Define a viewset for the room model
    # Specify the serializer class for this viewset
    serializer_class = RoomSerializer  # Use RoomSerializer to serialize Room objects

    def get_permissions(self):
        # Allow any user to access the list view, but require authentication for other actions
        if self.action == 'list':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_queryset(self):
        # Override the get_queryset method to return all rooms
        return Room.objects.all()  # Return all Room objects
    
    def perform_create(self, serializer):
        # Override the perform_create method to set the user_id of the room to the authenticated user
        serializer.save(user_id=self.request.user)  # Save the room with the user_id set to the authenticated user