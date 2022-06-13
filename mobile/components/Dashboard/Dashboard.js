import { Text, View, ScrollView } from "react-native";
import { adminPanel } from "./DashboardStyleSheet";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";

export default function Dashboard({ navigation }) {
    return (
        <View style={adminPanel.container}>
            <Header />
            <ScrollView>
                <Text>Dashboard</Text>
            </ScrollView>
            <Navigation />
        </View>
    );
}