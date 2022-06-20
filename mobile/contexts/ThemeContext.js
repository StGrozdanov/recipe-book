import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const changeTheme = async (theme) => {
        try {
            const jsonValue = JSON.stringify(theme)
            await AsyncStorage.setItem('theme', jsonValue)
            setTheme(theme);
          } catch (e) {
            // saving error
          }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const themeState = useContext(ThemeContext);

    return themeState;
}