from django.db import models
from django.contrib.auth.models import User  # Import the User model from Django's authentication system

# Create your models here.
class Room(models.Model):
    #user_id = models.IntegerField(blank=False)
    user_id = models.ForeignKey(
        User,  # The related model is User
        related_name="leads",  # The reverse relation name to access leads from a user instance
        on_delete=models.CASCADE,  # Delete leads if the related user is deleted
        null=True  # Allow the owner field to be null in the database
    )
    name = models.CharField(max_length=255,blank=False)
    description = models.TextField(max_length=500)
    address = models.CharField(max_length=255,blank=False)
    location = models.CharField(max_length=255)
    availability = models.CharField(max_length=100,blank=False)
    sqft = models.DecimalField(max_digits=25,decimal_places=2)
    capacity = models.IntegerField()
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    amenities = models.CharField(max_length=500)
    image = models.ImageField(null=True, blank=True,upload_to='images/')

    def __str__(self):
        return self.name