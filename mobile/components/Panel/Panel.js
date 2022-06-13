import { View, ScrollView } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

export default function Panel({ navigation, text }) {
    return (
        <View style={adminPanel.container}>
            <Header />
            <ScrollView>
                {text}
            </ScrollView>
            <Navigation />
        </View>
    );
}