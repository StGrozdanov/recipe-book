import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialUserState = {
    username: '',
    id: null,
    userToken: '',
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(initialUserState);

    AsyncStorage.getItem('user')
        .then(user => {
            if (user == null) {
                return;
            } else {
                setUser(JSON.parse(user))
            }
        })
        .catch((e) => {
            console.log(`Something went wrong with the user auth context - ${e}`);
            setUser(initialUserState);
        });


    const login = async (authData) => {
        await AsyncStorage.setItem('user', JSON.stringify(authData));
        setUser(authData);
    }

    const logout = async () => {
        await AsyncStorage.setItem('user', JSON.stringify(initialUserState));
        setUser(initialUserState);
    };

    const userIsAuthenticated = () => {
        return user.id !== null;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, userIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}