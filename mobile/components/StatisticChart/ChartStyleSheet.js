import { StyleSheet } from "react-native";

export const chartStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        shadowColor: 'rgba(111,115,255, 0.2)',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
        borderRadius: 25
    },

    title: {
        textAlign: "center",
        marginTop: 30,
        color: 'rgba(124,113,192, 0.65)',
    },

    darkTitle: {
        textAlign: "center",
        marginTop: 30,
        color: "floralwhite",
    },
});