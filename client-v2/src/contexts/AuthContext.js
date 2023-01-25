import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [user, setUser] = useLocalStorage('user', {});

    const userLogin = (userData) => {
        setUser(userData);
    };

    const userLogout = () => {
        setUser({});
    };

    const userIsAuthenticated = () => Boolean(user.sessionToken);

    const userIsResourceOwner = (resourceOwnerId) => resourceOwnerId === user.id;

    const userIsAdministrator = () => Boolean(user.isAdministrator);
    
    const userIsModerator = () => Boolean(user.isModerator);

    return (
        <AuthContext.Provider value={{
            user,
            userLogin,
            userLogout,
            userIsAuthenticated,
            userIsResourceOwner,
            userIsAdministrator,
            userIsModerator
        }}>
            {children}
        </AuthContext.Provider>  
    );
};
