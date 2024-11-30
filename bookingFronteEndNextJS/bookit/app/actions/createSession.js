'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.

async function createSession(previousState, formData) {
    // Extract email and password from formData.
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('email:', email, 'password:', password); // Log email and password for debugging.

    try {
        // Create a request body with email and password.
        const body = { 
            username: email, 
            password: password
        }
        // Make a POST request to the '/auth/login' endpoint with the request body.
        const res = await makeRequest('/auth/login', 'POST', null, body);
        if (!res.ok) {
            // If the response is not ok, log the response and return an error object.
            console.log('res:', res);
            return { error: res.statusText, status: res.status };
        }
        // Parse the response data as JSON.
        const data = await res.json();
        // Handle incorrect credentials error.
        if (data.non_field_errors && data.non_field_errors.includes("Incorrect Credentials")) 
            return { error: "Incorrect Credentials", status: 401 };
        // Handle any other errors from the response.
        if (data.token) {
            // If a token is found in the response, set it as a cookie.
            const cookiesInstance = await cookies();
            await cookiesInstance.set(
                'django session', data.token, 
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // Cookie expires in 1 day.
                }
            );
            // Return the previous state with a success flag.
            return {
                ...previousState,
                success: true,
            };
        }
        // If no token is found, return an error object.
        return { error: 'token not found', status: 401 };

    } catch (err) {
        // Handle any network or unexpected errors.
        return { error: err.message, status: 500 };
    }
}

export default createSession; // Export the createSession function as the default export.