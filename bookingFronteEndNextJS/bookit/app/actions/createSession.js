'use server';

async function createSession(previousState,formData) 
{
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('email:', email , 'password', password);

    if (!email || !password) {
        return {
            ...previousState,
            error: 'Email and password are required',
        };
    }
}

export default createSession;