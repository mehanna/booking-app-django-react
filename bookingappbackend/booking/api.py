from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from booking.models import Room, RoomBooking
from rest_framework import status
from .serializers import RoomSerializer, BookingSerializer

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
    

class BookingViewSet(viewsets.ModelViewSet):
    # Specifies the serializer class to be used for this viewset
    serializer_class = BookingSerializer

    def get_permissions(self):
        # Sets permissions based on the action being performed
        self.permission_classes = [IsAuthenticated]    
        return super().get_permissions()

    def get_queryset(self):
        # Get the current authenticated user
        user = self.request.user
        # Get the room ID from the request parameters, if provided
        room_id = self.request.query_params.get('room.id', None)

        # retrieve the booking instances based on the user's authentication status and room ID
        # if room_id is provided, retrieve bookings for that room only
        # otherwise, retrieve bookings for the authenticated user
        if room_id:
            booking = RoomBooking.objects.filter(room_id=room_id)
        else:
            booking = RoomBooking.objects.filter(user_id=user.id)
        
        
        # Use select_related to optimize the query for the related room data
        booking = booking.select_related('room')
        
        return booking

    def perform_create(self, serializer):
        # Saves a new booking instance with the user_id set to the current authenticated user
        serializer.save(user_id=self.request.user)

    def destroy(self, request, *args, **kwargs):
        # Deletes a booking instance
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)