import React from 'react'
import rooms from '../assets/data/rooms'
import RoomCard from '../components/RoomCard'



const HomePage = () => {
  return (
    <>
      {rooms.length > 0 ? 
      ( 
        rooms.map((room) => (<RoomCard key={room.id} room={room} /> ) )
      ) : 
      ( <h1>No Rooms Found</h1> )}
    </>
  )
}

export default HomePage
