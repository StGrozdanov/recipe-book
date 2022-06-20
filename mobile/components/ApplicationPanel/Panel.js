import { View } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

export default function Panel({ navigation, content }) {
    return (
        <View style={adminPanel.container}>
            <Header />
                { content }
            <Navigation />
        </View>
    );
}