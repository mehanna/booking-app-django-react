import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaEye } from 'react-icons/fa';
import CancelBookingButton from './CancelBookingButton';

const BookedRoomCard = ({booking}) => {

    const { room: room } = booking;

    // Function to format a date string into a readable format
    const formatDateString = (dateString) => {
      // Create a new Date object from the date string
      const date = new Date(dateString);
    
      // Get the abbreviated month name
      const options = { month: 'short', timeZone: 'UTC' };
      const month = date.toLocaleString('en-US', options);
    
      // Get the day of the month
      const day = date.getUTCDate();
    
      // Format the time consistently using UTC to avoid hydration mismatch
      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC',
      };
      const time = date.toLocaleString('en-US', timeOptions);
    
      // Return the final formatted string
      return `${month} ${day} at ${time} UTC`;
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center" >
        <div>
        <h4 className='text-lg font-semibold'>{room.name}</h4>
        <p className="text-sm text-gray-600">
            <strong>Check In:</strong>  {formatDateString(booking.start_DateTime)}
        </p>
        <p className="text-sm text-gray-600">
            <strong>Check Out:</strong> {formatDateString(booking.end_DateTime)}
        </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
              href={`/rooms/${room.id}`}
              className='bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700'
            >
              <FaEye className='inline mr-1' /> View room
        </Link>
        <CancelBookingButton bookingId={booking.id} />
        </div>
    </div>
  )
}

export default BookedRoomCard