async function makeRequest(path, method = 'GET', token = null, body = null) {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        console.log('config:', config);
        console.log('url:', `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, config);
        return res
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export { makeRequest }; // Export the makeRequest function as a named export.