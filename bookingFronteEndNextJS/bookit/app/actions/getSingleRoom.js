'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.

async function getSingleRooms(id) {
    try {
        // Fetching the rooms data from the API
        const response = await makeRequest(`/rooms/${id}/`, 'GET');

        // Parsing the response to get the data
        const data = await response.json();
        // Logging the data to the console
        //console.log('rooms data:', data);
        
        // revalidating the cache
        // Revalidate the cache for this path
        // todo: fix the revalidatePath function 
        //revalidatePath('/', 'layout');

        return data;
    }
    catch (error) {
        console.error('Fetch rooms data error:', error);
        // Redirecting to the error page
        redirect('/error');
    }
}

export default getSingleRooms;