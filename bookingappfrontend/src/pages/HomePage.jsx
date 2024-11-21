import React from 'react'
import rooms from '../assets/data/rooms'
const HomePage = () => {
  return (
    <>
      {rooms.length > 0 ? 
      ( rooms.map((room) => (<h3>{room.name}</h3>) ) ) : 
      ( <h1>No Rooms Found</h1> )}
    </>
  )
}

export default HomePage
