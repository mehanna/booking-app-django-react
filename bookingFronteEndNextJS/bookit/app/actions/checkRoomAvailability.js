'use server';
import { redirect } from 'next/navigation';
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.

async function checkRoomAvailability(room_id,startDateTime, endDateTime) {

    if (!room_id || !startDateTime || !endDateTime) {
        return { error: 'Missing required fields', status: 400 };
    }
    
    const sessionName = 'django session'; // Set the session cookie name.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('django session');

    if (!sessionCookie) 
    {
        console.log('error request response:', sessionCookie);
        redirect('/login');
    }
    const token = sessionCookie.value; 
    if (!token) {
        console.log('error request response:', token);
        redirect('/login');
    }

    try {
        const response = await makeRequest(`/bookings/?room.id=${room_id}`, 'GET', token);
        // Parsing the response to get the data
        const allBooking = await response.json();
        for (const booking of allBooking) {
            if ( (startDateTime >= booking.start_DateTime && startDateTime <= booking.end_DateTime)
                || (endDateTime >= booking.start_DateTime && endDateTime <= booking.end_DateTime) ) 
            {
                return false;
            }

        }

        return true;
    }
    catch (error) {
        console.log('Failed to check availability', error);
        return {
          error: 'Failed to check availability',
        };
    }
}

export default checkRoomAvailability;