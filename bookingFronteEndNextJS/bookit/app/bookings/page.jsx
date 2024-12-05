import React from 'react'
import Heading from '@/components/Heading';
import getBooking from '../actions/getBooking';
import BookedRoomCard from '@/components/BookedRoomCard';


const BookingsPage = async () => {

  const bookings = await getBooking();

  return (
    <>
      <Heading title="My Booking" />
      {bookings.length > 0 ? 
      ( 
        bookings.map((booking) => (<BookedRoomCard key={bookings.id} room={bookings} />) )
      ) : 
      (<p>You have no booking listings</p> )}
    </>
  )
}

export default BookingsPage
