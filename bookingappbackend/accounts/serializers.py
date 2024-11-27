from rest_framework import serializers  # Importing serializers from Django REST framework
from django.contrib.auth.models import User  # Importing the User model from Django's auth system
from django.contrib.auth import authenticate  # Importing the authenticate function from Django's auth system

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specifying the model to serialize
        fields = ('id','email')  # Specifying the fields to include in the serialization

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specifying the model to serialize
        fields = ('id','email', 'password')  # Specifying the fields to include in the serialization
        extra_kwargs = {'password': {'write_only': True}}  # Making the password field write-only

    def create(self, validated_data):
        # Creating a new user with the validated data
        user = User.objects.create_user( validated_data['email'], validated_data['password'])
        return user  # Returning the created user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  # get to email field
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(username=User.objects.get(email=email).username, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")