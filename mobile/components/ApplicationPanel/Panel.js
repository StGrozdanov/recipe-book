import { View } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function Panel({ navigation, content }) {
    const { theme } = useThemeContext();

    return (
        <View style={adminPanel[theme + 'Container']}>
            <Header />
            {content}
            <Navigation />
        </View>
    );
}