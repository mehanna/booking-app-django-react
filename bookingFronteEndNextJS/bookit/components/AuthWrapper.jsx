'use client';
import { AuthProvider } from '@/context/authContext'; // Importing the AuthProvider component from a specific path

// as a good practice, we wrap the entire application with the AuthProvider component
// to ensure that the authentication context is available to all components and we don't have 
// to change the structure of  layout.jsx to be client side
const AuthWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;
