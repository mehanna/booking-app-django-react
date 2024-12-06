'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.
import { revalidatePath } from 'next/cache';
import checkRoomAvailability from './checkRoomAvailability';


async function bookRoom(previousState, formData) {

    const sessionName = 'django session'; // Set the session cookie name.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('django session');

    if (!sessionCookie) 
    {
        return {error: 'You must be logged in to book a room', status: 401};
    }
    const token = sessionCookie.value; 
    if (!token) {
        // If no token is found in the cookie, return an error object.
        return { error: 'No token found', status: 401 };
    }
    // Extract the start and end date time from the form data
    const checkInDate = formData.get('check_in_date');
    const checkInTime = formData.get('check_in_time');
    const checkOutDate = formData.get('check_out_date');
    const checkOutTime = formData.get('check_out_time');

    // companied the start and end date time ISO 8601 format
    const start_DateTime = new Date(`${checkInDate}T${checkInTime}:00`).toISOString();
    const end_DateTime = new Date(`${checkOutDate}T${checkOutTime}:00`).toISOString();
    // Create a request body with email and password.
    const body = 
    {
        room: formData.get('room_id'),
        start_DateTime: start_DateTime,
        end_DateTime: end_DateTime
    }

    // Check if the room is available
    const isAvailable = await checkRoomAvailability(body.room, start_DateTime, end_DateTime);
    if (!isAvailable || isAvailable.error) 
    {
        return { error: 'Room is not available', status: 400 };
    }


    try
    {
        const res = await makeRequest('/bookings/', 'POST', token, body);
        if (!res.ok) 
        {
            console.log('error request response:', res);
            return { error: 'error creating user', status: 400 };
        }
        revalidatePath('/bookings', 'layout');

            // Return the previous state with a success flag.
        return {
            ...previousState,
            success: true,
        };

    }
    catch (err) 
    {
        // Handle any network or unexpected errors.
        return { error: err.message, status: 500 };
    }

}

export default bookRoom; // Export the createUser function as the default export.