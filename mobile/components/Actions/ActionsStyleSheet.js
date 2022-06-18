import { StyleSheet } from "react-native";

export const actionStyles = StyleSheet.create({
    action: {
        borderWidth: 0.5,
        borderColor: 'white',
        paddingVertical: 13,
        paddingHorizontal: 38,
        flexDirection: "row",
    },

    text: {
        color: 'white',
    },

    icons: {
        position: "absolute",
        top: '70%',
        left: '10%',
    }
});