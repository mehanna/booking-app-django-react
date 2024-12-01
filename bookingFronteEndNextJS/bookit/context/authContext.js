import 
{
    createContext, 
    useContext,
    useState, 
    useEffect
} from 'react'; // Importing necessary hooks and functions from React

import checkAuth from '@/app/actions/checkAuth'; // Importing the checkAuth function from a specific path

const AuthContext = createContext(); // Creating a context for authentication

// AuthProvider component that will wrap around parts of the app that need authentication
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if the user is authenticated
    const [currentUser, setCurrentUser] = useState(null); // State to store the current user's information

    useEffect(() => {
        // Function to check authentication status
        const checkAuthentication = async () => {
            const result = await checkAuth(); // Call the checkAuth function to get authentication status
            console.log('isAuthenticated:', result);
            setIsAuthenticated(result.isAuthenticated); // Update the isAuthenticated state with the result
            setCurrentUser(result.user); // Update the currentUser state with the user information
        };
        checkAuthentication(); // Call the checkAuthentication function when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            setIsAuthenticated,
            currentUser,
            setCurrentUser,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext); // Get the context value
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); // Throw an error if used outside AuthProvider
    }
    return context; // Return the context value
};

/*
### Detailed Explanation

1. **Imports**:
   - `createContext`, `useContext`, `useState`, `useEffect` are imported from React to create and use context, manage state, and handle side effects.
   - `checkAuth` is imported from a specific path to check the authentication status.

2. **AuthContext**:
   - `createContext()` is called to create a new context for authentication.

3. **AuthProvider Component**:
   - This component will wrap around parts of the app that need authentication.
   - It uses `useState` to create two state variables:
     - `isAuthenticated` to track if the user is authenticated.
     - `currentUser` to store the current user's information.
   - `useEffect` is used to run a side effect when the component mounts:
     - `checkAuthentication` is an asynchronous function that calls `checkAuth` to get the authentication status and user information.
     - The state variables `isAuthenticated` and `currentUser` are updated with the results.
   - The component returns an `AuthContext.Provider` that provides the context value (authentication state and user information) to its children.

4. **useAuth Hook**:
   - This custom hook allows components to access the authentication context.
   - `useContext(AuthContext)` is called to get the context value.
   - If the context is `undefined`, an error is thrown to ensure the hook is used within an `AuthProvider`.
   - The context value is returned for use in components.
*/