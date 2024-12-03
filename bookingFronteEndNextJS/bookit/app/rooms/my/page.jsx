import UserRoomCard from '@/components/UserRoomCard';
import Heading from '@/components/Heading';
import getUserRooms from '@/app/actions/getUserRooms';

const MyRoomsPage = async () => {
  const rooms = await getUserRooms();

  return (
    <>
      <Heading title="My Rooms" />
      {rooms.length > 0 ? 
      ( 
        rooms.map((room) => (<UserRoomCard key={room.id} room={room} /> ) )
      ) : 
      (<p>You have no room listings</p> )}
    </>
  );
};
export default MyRoomsPage;




