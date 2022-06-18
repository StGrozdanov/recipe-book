import { StyleSheet } from "react-native";

export const actionsDropdownStyles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: 'rgba(124,113,192,0.78)',
        top: '0%',
        right: '20%',
        borderRadius: 5,
    },

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