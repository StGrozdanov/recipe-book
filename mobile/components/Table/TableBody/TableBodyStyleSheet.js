import { StyleSheet } from "react-native";

export const tableBodyStyles = StyleSheet.create({
    additionalData: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
        paddingVertical: 30,
    },

    additionalDataHeading: {
        marginBottom: 10,
        fontWeight: '400',
        textAlign: 'center',
    },

    additionalDataContent: {
        textAlign: "center",
        fontWeight: "300",
        fontSize: 12,
    },

    toggledData: {
        display: "none",
    },

    online: {
        color: 'green',
        fontWeight: '400',
        borderWidth: 0.8,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: "#2ac99111",
        borderColor: "green",
    },

    offline: {
        color: 'red',
        fontWeight: '400',
        borderWidth: 0.8,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: "#ff000010",
        borderColor: "red",
    },
});