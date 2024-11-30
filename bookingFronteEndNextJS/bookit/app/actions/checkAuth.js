'use server';
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.


async function checkAuth()
{
    const sessionName = 'django session'; // Set the session cookie name.
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('django session');

    if (!sessionCookie) 
    {
        return {
            isAuthenticated: false,
        };
    }
    try{
        const token = sessionCookie.value; // Extract the token from the session cookie.
        if (!token) {
            // If no token is found in the cookie, return an error object.
            return { error: 'No token found', status: 401 };
        }
        const res = await makeRequest('/auth/user', 'GET', token);  
        if (!res.ok) {
            return {
                isAuthenticated: false,
            };
        }
        // Parse the response data as JSON.
        const user = await res.json();
        return {
            isAuthenticated: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
        };

    }
    catch(err)
    {
        console.error(err);
        return {
            isAuthenticated: false,
        };
    }
}

export default checkAuth;