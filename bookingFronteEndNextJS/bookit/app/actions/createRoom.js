'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.

async function createRoom(previousState, formData)
{
    try
    {
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
        // Handle image data 
        const imageFile = formData.get('image');
        if (imageFile && imageFile.size > 0 && imageFile.name !== 'undefined') 
        {
            // create a new room body
            const body = new FormData();
            body.append('name', formData.get('name'));
            body.append('description', formData.get('description'));
            body.append('sqft', formData.get('sqft'));
            body.append('capacity', formData.get('capacity'));
            body.append('location', formData.get('location'));
            body.append('address', formData.get('address'));
            body.append('availability', formData.get('availability'));
            body.append('price_per_hour', formData.get('price_per_hour'));
            body.append('amenities', formData.get('amenities'));
            body.append('image', imageFile);

            const res = await makeRequest('/rooms/', 'POST', token,body);
            if (!res.ok) 
            {
                console.log('Create Room not ok res:', res);
                return { error: res.statusText, status: res.status };
            }
            return { ...previousState, success: true };
        }
        else
        {
            return {error: 'Image is required'}
        }
    }
    catch(err)
    {
        return {error: err.message, status: 500};
    }
}
export default createRoom