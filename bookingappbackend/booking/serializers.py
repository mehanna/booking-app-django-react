from rest_framework import serializers
from booking.models import Room,RoomBooking

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        

class BookingSerializer(serializers.ModelSerializer):
    # The 'room' field is a PrimaryKeyRelatedField, which means it will be represented by its primary key (ID).
    # The 'required=False' makes this field optional in the input data.
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), required=False)
    
    class Meta:
        # Specifies the model that this serializer is for.
        model = RoomBooking
        # Includes all fields from the RoomBooking model in the serializer.
        fields = '__all__'
    
    def to_representation(self, instance):
        # Converts the instance into a dictionary of primitive data types.
        representation = super().to_representation(instance)
        # If the 'room' field is present, it uses the RoomSerializer to include the entire room data.
        # Otherwise, it sets the 'room' field to None.
        representation['room'] = RoomSerializer(instance.room).data if instance.room else None
        return representation