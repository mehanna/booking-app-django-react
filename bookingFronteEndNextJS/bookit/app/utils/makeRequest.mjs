async function makeRequest(path, method = 'GET', token = null, body = null) {
    // Create a configuration object for the request.
    const config = {
        method: method, // Set the HTTP method (default is 'GET').
        headers: {
            "Content-Type": "application/json" // Set the content type to JSON.
        }
    };

    // If a token is provided, add it to the Authorization header.
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    // If a body is provided, stringify it and add it to the request configuration.
    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        // Log the request configuration for debugging.
        console.debug('config:', config);
        // Log the full URL for debugging.
        console.debug('url:', `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
        // Make the HTTP request using fetch and return the response.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, config);
        return res;
    } catch (err) {
        // Log any errors to the console and rethrow the error.
        console.error(err);
        throw err;
    }
}

export { makeRequest }; // Export the makeRequest function as a named export.