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
        textAlign: 'center',
    },

    icons: {
        position: "absolute",
        top: '70%',
        left: '10%',
    },

    searchAction: {
        borderColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 30,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomWidth: 0.7,
    },

    darkSearchIcons: {
        position: "absolute",
        left: '12%',
    },

    lightSearchIcons: {
        position: "absolute",
        left: '8%',
    },
});