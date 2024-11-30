from rest_framework import serializers  # Importing serializers from Django REST framework
from django.contrib.auth.models import User  # Importing the User model from Django's auth system
from django.contrib.auth import authenticate  # Importing the authenticate function from Django's auth system

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')  # Adding a name field

    class Meta:
        model = User  # Specifying the model to serialize
        fields = ('id', 'username', 'email', 'name')  # Specifying the fields to include in the serialization

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='first_name')  # Adding a name field

    class Meta:
        model = User  # Specifying the model to serialize
        fields = ('id', 'username', 'email', 'password', 'name')  # Specifying the fields to include in the serialization
        extra_kwargs = {'password': {'write_only': True}}  # Making the password field write-only

    def create(self, validated_data):
        # Creating a new user with the validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name']  # Adding the name field
        )
        return user  # Returning the created user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()  # Defining a username field
    password = serializers.CharField()  # Defining a password field

    def validate(self, data):
        # Authenticating the user with the provided data
        user = authenticate(**data)
        if user and user.is_active:
            return user  # Returning the authenticated user if active
        raise serializers.ValidationError("Incorrect Credentials")  # Raising an error if authentication fails