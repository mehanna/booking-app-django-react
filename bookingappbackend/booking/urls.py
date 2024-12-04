from rest_framework import routers
from .api import RoomViewSet, BookingViewSet

router = routers.DefaultRouter()
router.register('api/rooms', RoomViewSet, 'expenses')
router.register('api/bookings', BookingViewSet, 'bookings')

urlpatterns = router.urls