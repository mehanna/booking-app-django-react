from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

#register API
# Define a view for user registration
class RegisterAPI(generics.GenericAPIView):
    # Specify the serializer class to be used for this view
    serializer_class = RegisterSerializer
    
    # Define the POST method for this view
    def post(self, request, *args, **kwargs):
        # Get the serializer with the request data
        serializer = self.get_serializer(data=request.data)
        # Validate the serializer data, raising an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Save the serializer data to create a new user
        user = serializer.save()
        # Return a response with the user data and authentication token
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,  # Serialize the user data
            "token": AuthToken.objects.create(user)[1]  # Create an authentication token for the user
        })


#login API
class LoginAPI(generics.GenericAPIView):
    # Specify the serializer class to be used for this view
    serializer_class = LoginSerializer
    
    # Define the POST method for this view
    def post(self, request, *args, **kwargs):
        # Get the serializer with the request data
        serializer = self.get_serializer(data=request.data)
        # Validate the serializer data, raising an exception if invalid
        serializer.is_valid(raise_exception=True)
        # Get the user from the validated data
        user = serializer.validated_data
        # Create an authentication token for the user
        _, token = AuthToken.objects.create(user)
        # Return a response with the user data and authentication token
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,  # Serialize the user data
            "token": token  # Return the authentication token
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,  # Allow access only to authenticated users
    ]
    serializer_class = UserSerializer
    
    # Define the GET method for this view
    def get_object(self):
        return self.request.user  # Return the authenticated user