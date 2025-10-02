from django.core.management.base import BaseCommand
from booking.models import Room


class Command(BaseCommand):
    help = 'Update room image paths from Appwrite URLs to local static images'

    def handle(self, *args, **options):
        # Mapping of room names to local image files
        room_image_mapping = {
            'Grand Conference Hall': '/images/room-1.jpg',
            'Creative Hub': '/images/room-2.jpg', 
            'Training Room': '/images/room-3.jpg',
            'Executive Boardroom': '/images/room-4.jpg',
            'Innovation Lab': '/images/room-5.jpg',
        }
        
        # Alternative mapping based on current image patterns if name mapping doesn't work
        appwrite_to_local_mapping = {
            'images/room-1_eyfH0sR.jpg': '/images/room-1.jpg',
            'images/room-2_XYZ123.jpg': '/images/room-2.jpg',
            'images/room-3_TWSs97T.jpg': '/images/room-3.jpg',
            'images/room-4_VXB8Ltt.jpg': '/images/room-4.jpg',
            'images/room-5_ABC456.jpg': '/images/room-5.jpg',
        }

        rooms = Room.objects.all()
        updated_count = 0

        for room in rooms:
            new_image_path = None
            
            # Try to match by room name first
            if room.name in room_image_mapping:
                new_image_path = room_image_mapping[room.name]
            # Try to match by current image path
            elif str(room.image) in appwrite_to_local_mapping:
                new_image_path = appwrite_to_local_mapping[str(room.image)]
            # Default mapping based on room ID
            else:
                # Use a cycling pattern for room images
                image_number = ((room.id - 1) % 5) + 1
                new_image_path = f'/images/room-{image_number}.jpg'

            if new_image_path:
                old_image_path = str(room.image)
                room.image = new_image_path
                room.save()
                updated_count += 1
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Updated Room {room.id} ({room.name}): '
                        f'{old_image_path} -> {new_image_path}'
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully updated {updated_count} room image paths'
            )
        )