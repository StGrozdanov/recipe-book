import { View, ScrollView } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

export default function Panel({ navigation, content }) {
    return (
        <View style={adminPanel.container}>
            <Header />
            <ScrollView style={{flex: 1}}>
                { content }
            </ScrollView>
            <Navigation />
        </View>
    );
}