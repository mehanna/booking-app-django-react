'use server'; // This directive indicates that the code is intended to run on the server side.
import { cookies } from 'next/headers'; // Importing the cookies utility from Next.js headers.

async function createSession(previousState, formData) {
    // Extract email and password from formData.
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('email:', email, 'password:', password); // Log email and password for debugging.

    // Set up headers and body for the POST request.
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // Convert email and password to JSON string.
    };

    try {
        // Send a POST request to the login endpoint.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, config);
        const data = await res.json(); // Parse the response JSON.

        // If the response is OK and contains a token, set a cookie with the token.
        if (res.ok && data.token) {
            await cookies().set(
                'django session', data.token, {
                    httpOnly: true, // Cookie is not accessible via JavaScript.
                    secure: true, // Cookie is only sent over HTTPS.
                    sameSite: 'strict', // Cookie is only sent in first-party context.
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // Cookie expires in 1 day.
                    path: '/', // Cookie is available on the entire site.
                }
            );
            return {
                ...previousState, // Spread the previous state.
                success: true, // Indicate success.
            };
        }

        // Handle incorrect credentials error.
        if (data.non_field_errors && data.non_field_errors.includes("Incorrect Credentials")) {
            return { error: "Incorrect Credentials", status: 401 };
        }

        // Return any other errors from the response.
        return { error: data, status: res.status };
    } catch (err) {
        // Handle any network or unexpected errors.
        return { error: err.message, status: 500 };
    }
}

export default createSession; // Export the createSession function as the default export.