'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.
import { makeRequest } from '@/app/utils/makeRequest'; // Import the makeRequest function from the utils folder.


async function createUser(previousState, formData) {

    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const  name = formData.get('name');
    if (!email || !password || !name) 
    {
        // If email or password is missing, return an error object.
        return { error: 'email, password or name is missing', status: 400 };
    }
    if (password.length < 6) 
    {
        // If the password is less than 8 characters, return an error object.
        return { error: 'password must be at least 8 characters long', status: 400 };
    }
    if (password !== confirmPassword)
    {
        // If the password and confirm password do not match, return an error object.
        return { error: 'passwords do not match', status: 400 };
    }

            // Create a request body with email and password.
    const body = 
    { 
        username:email,
        email:email,
        password: password,
        name:name
    }
    try
    {
        const res = await makeRequest('/auth/register', 'POST', null, body);
        if (!res.ok) {
            const data =  await res.json();
            if (data.username){
                console.log('error data:', data.username);
                return { error: data.username, status: 400 };
            }
            console.log('error data:', data);
            console.log('error request response:', res);
            return { error: 'error creating user', status: 400 };
        }
        // Parse the response data as JSON.
        const data = await res.json();
        console.log('createUser data:', data);
        // Handle any other errors from the response.
        if (data.token) 
        {
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

    }
    catch (err) 
    {
        // Handle any network or unexpected errors.
        return { error: err.message, status: 500 };
    }

}

export default createUser; // Export the createUser function as the default export.