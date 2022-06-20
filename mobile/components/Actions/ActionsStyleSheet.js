import { StyleSheet } from "react-native";

export const actionStyles = StyleSheet.create({
    action: {
        borderColor: 'white',
        paddingVertical: 11,
        paddingHorizontal: 38,
        flexDirection: "row",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderBottomWidth: 0.5,
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