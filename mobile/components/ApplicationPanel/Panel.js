import { View } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';

export default function Panel({ navigation, content }) {
    const { theme } = useThemeContext();

    const androidNavAndStatusBarColors = theme == 'light' ? 'dark' : 'light';

    const androidNavBarBackground = theme == 'light' ? '#EFEEFE' : 'black';
    NavigationBar.setBackgroundColorAsync(androidNavBarBackground);
    NavigationBar.setButtonStyleAsync(androidNavAndStatusBarColors);

    return (
        <>
            <StatusBar
                backgroundColor={theme == 'light' ? "#EFEEFE" : "rgba(124,113,192,0.9)"}
                style={androidNavAndStatusBarColors}
            />
            <View style={adminPanel[theme + 'Container']}>
                <Header />
                {content}
                <Navigation />
            </View>
        </>
    );
}