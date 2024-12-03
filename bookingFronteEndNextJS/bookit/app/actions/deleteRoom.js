'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function deleteRoom(roomId)
{
    const sessionName = 'django session'; // Set the session cookie name.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('django session');
    
    if (!sessionCookie) 
    {
        console.log('User not logged in before deleting room');
        redirect('/login');
    }
    const token = sessionCookie.value; 
    if (!token) {
        // If no token is found in the cookie, return an error object.
        return { error: 'No token found', status: 401 };
    }
    
    console.log('Deleting room:', roomId);
    try
    {
        const response = await makeRequest(`/rooms/${roomId}/`,'DELETE', token);
        if (!response.ok)
        {
            console.log('Delete room not ok res:', response);
            return { error: response.statusText, status: response.status };
        }
        // successfully deleted room
         // Revalidate my rooms and all rooms
         /*
         This is useful when you want to ensure that the data displayed 
         on a page is up-to-date, especially after performing actions
          like adding, updating, or deleting data.
         */
        revalidatePath('/rooms/my', 'layout');
        revalidatePath('/', 'layout');
        return {
            success: true,
        };
    }
    catch(err)
    {
        console.error('Delete room error:', err);
        return { error: err.message, status: 500 };
    }

}
export default deleteRoom