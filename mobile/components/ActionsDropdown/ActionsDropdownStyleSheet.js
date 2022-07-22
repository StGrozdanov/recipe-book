import { StyleSheet } from "react-native";

export const actionsDropdownStyles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: 'rgba(124,113,192,0.78)',
        top: '0%',
        right: '16%',
        borderRadius: 10,
        zIndex: 5,
        backgroundColor: 'rgba(124,113,192,0.88)',
    },

    lightSearchContainer: {
        position: "absolute",
        backgroundColor: 'rgba(124,113,192,0.65)',
        top: '72%',
        right: '46%',
        width: '114%',
        maxHeight: 250,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 5,
    },

    darkSearchContainer: {
        position: "absolute",
        top: '93%',
        right: '55%',
        width: '95%',
        maxHeight: 250,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 5,
        backgroundColor: 'rgba(124,113,192,0.95)',
    }
});