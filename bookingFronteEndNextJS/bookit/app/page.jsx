"use client";
import Image from "next/image";
import Heading from "@/components/Heading";
import RoomCard from "@/components/RoomCard";
import {React,
  useState,
  useEffect,
} from 'react'



export default function Home() {
    // creating a state variable to store the job listings
    const[rooms,setRooms] = useState([]);
    const[loading,setLoading] = useState(true);
    ///////////////////////////////////////////////
    ///-Fetching/////////////////
    // async Fetching the jobs data from the API
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          // Fetching the jobs data from the API
          const response = await fetch(`http://localhost:8000/api/rooms/`);
          console.log('Fetch rooms data response:', response.url);

          // Parsing the response to get the data
          const data = await response.json();
          // Logging the data to the console
          console.log('rooms data:', data);
          // Setting the jobs state variable with the data
          setRooms(data);
        } catch (error) {
          console.error('Fetch rooms data error:', error);
        } finally {
          // Setting the loading state variable to false
          setLoading(false);
          console.log('Fetch rooms data finally');
        }
      }
      // Calling the fetchJobs function
      fetchJobs();
    }, []); // Empty dependency array to run the effect only once
    

  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? 
      ( 
        rooms.map((room) => (<RoomCard key={room.id} room={room} /> ) )
      ) : 
      ( <h1>No Rooms Found</h1> )}
    </>
  )
}
