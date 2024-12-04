from rest_framework import serializers
from booking.models import Room,RoomBooking

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomBooking
        fields = '__all__'