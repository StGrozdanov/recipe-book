import { StyleSheet } from "react-native";

export const radioButtonStyles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
    },

    lightWrapper: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(124,113,192,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    selected: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: 'rgba(124,113,192,0.45)',
    },

    lightText: {
        marginLeft: 11, 
        color: 'rgba(124,113,192,1)', 
        fontSize: 15,
        alignSelf: "center",
    },

    darkText: {
        marginLeft: 11, 
        color: 'rgba(124,113,192,0.6)', 
        fontSize: 15,
        alignSelf: "center",
    },

    darkWrapper: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(124,113,192,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});