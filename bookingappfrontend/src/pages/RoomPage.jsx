import React from 'react'
import { useParams ,useLoaderData} from 'react-router-dom'
import rooms from '../assets/data/rooms'

const RoomPage = () => {
  const { id } = useParams();
  const room = useLoaderData();
  //const room = rooms.find((room) => room.id === id);
  return (
    <>
      {room.id}
    </>
  )
}

  // Fetching the job data from the API using the loader function 
const roomLoader = async ( { params }) => {
    const response = await fetch(`/api/rooms/${params.id}`);
    const data = await response.json();
    console.log('room data:', data);
    return data;

};

//export default RoomPage
export { RoomPage as default, roomLoader }; 

