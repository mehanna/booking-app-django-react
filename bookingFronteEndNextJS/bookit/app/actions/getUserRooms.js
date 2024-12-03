'use server'; // This directive indicates that the code is intended to run on the server side.
import checkAuth from './checkAuth';
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.



async function  getUserRooms(){
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to get user rooms',
      };
    }
    const sessionName = 'django session'; // Set the session cookie name.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('django session');
    if (!sessionCookie) 
    {
        return {error: 'You must be logged in to create a room', status: 401};
    }
    const token = sessionCookie.value; 
    if (!token) {
        // If no token is found in the cookie, return an error object.
        return { error: 'No token found', status: 401 };
    }

    try {
        // Fetching the rooms data from the API
        const response = await makeRequest('/rooms', 'GET', token);

        if (!response.ok) {
            return { error: response.statusText, status: response.status };
        }
        // Parsing the response to get the data
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('Fetch rooms data error:', error);
        // Redirecting to the error page
        return { error: error.message, status: 500 };
    }
}

export default getUserRooms
