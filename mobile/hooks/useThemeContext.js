import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useThemeContext = () => {
    const themeState = useContext(ThemeContext);

    return themeState;
}