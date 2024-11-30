'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.

async function destroySession() {
    const sessionName = 'django session'; // Set the session cookie name.
    const sessionCookie = await cookies().get(sessionName); // Get the session cookie.

    if (!sessionCookie) {
        // If no session cookie is found, return an error object.
        return { error: `No session cookie found`, status: 401 };
    }

    try {
        const token = sessionCookie.value; // Extract the token from the session cookie.
        if (!token) {
            // If no token is found in the cookie, return an error object.
            return { error: 'No token found', status: 401 };
        }
        // Make a POST request to the '/auth/logout' endpoint with the token.
        const res = await makeRequest('/auth/logout', 'POST', token);
        if (!res.ok) {
            // If the response is not ok, log the response and return an error object.
            console.log('res:', res);
            return { error: res.statusText, status: res.status };
        }
        console.debug('destroy token:', token); // Log the token for debugging.
        console.debug('res:', res); // Log the response for debugging.

        // Delete the session cookie.
        cookies().delete(sessionName);

        // Return a success object.
        return {
            success: true,
        };

    } catch (err) {
        console.error(err); // Log any errors to the console.
        // Handle any network or unexpected errors.
        return {
            error: 'Error deleting session',
        };
    }
}

export default destroySession; // Export the destroySession function as the default export.