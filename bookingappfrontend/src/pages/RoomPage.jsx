import React from 'react'
import { useParams ,useLoaderData} from 'react-router-dom'
import Heading from '../components/Heading'
import { Link } from 'react-router-dom'
import {FaChevronLeft} from 'react-icons/fa'
import BookingForm from '../components/BookingForm'

const RoomPage = () => {
  const room = useLoaderData();

  if (!room) {
    return (
      <Heading title="Room not found" /> 
    )
  }
  return (
    <>
      {/* Heading: Displaying the room name */}
      <Heading title={room.name} /> 

      {/* Data Displaying the room booking details */}
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className= 'inLine mr-1'/>
          <span className="ml-2">Back to Rooms</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <img
            src={`${room.image}`}
            alt={room.name}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">
              {room.description}
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Size: </span> 
                 {room.sqft} sq ft
              </li>
              <li>
                <span className="font-semibold text-gray-800">Availability: </span>
                {room.availability} 
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price: </span>
                ${room.price_per_hour}/hour
              </li>
              <li>
                <span className="font-semibold text-gray-800">Address:</span> 
                {room.address}
              </li>
            </ul>
          </div>
        </div>
        {/* Booking input Form */}
        <BookingForm />
      </div>
    </>
  )
}

  // Fetching the job data from the API using the loader function 
const roomLoader = async ( { params }) => {
  try{
    const response = await fetch(`/api/rooms/${params.id}`);
    const data = await response.json();
    console.log('room data:', data);
    return data;
  }
  catch (error) {
    console.error('Fetch room data error:', error);
    
  }
};

//export default RoomPage
export { RoomPage as default, roomLoader }; 

