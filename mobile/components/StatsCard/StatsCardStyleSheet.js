import { StyleSheet } from "react-native";

export const statsCardStyles = StyleSheet.create({
    card: {
        width: '44%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 5,
        position: "relative",
        marginBottom: 20,
        shadowColor: '#808adad9',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.4,
        shadowRadius: 35,
        elevation: 23,
    },

    iconContainer: {
        borderRadius: 50,
        padding: 5,
        position: "absolute",
        top: 3,
        left: 3,
    },

    icons: {
        borderRadius: 50,
        color: '#55595c',
    },

    publications: {
        color: '#78C0F0',
        backgroundColor: '#78c0f040',
    },

    users: {
        color: '#615FFE',
        backgroundColor: '#615ffe30',
    },

    comments: {
        color: '#735ADC',
        backgroundColor: '#735adc30',
    },

    visitations: {
        color: '#2AC991',
        backgroundColor: '#2ac99130',
    },

    textContent: {
        textAlign: "center",
        marginBottom: 8,
        color: '#55595c',
    },

    cardHeading: {
        fontSize: 11,
    },

    afterElement: {
        borderWidth: 1.5,
        borderColor: "white",
        position: "absolute",
        borderRadius: 20,
        width: "87%",
        height: 25,
        top: "37%",
        left: "7%",
        zIndex: -1,
    },

    darkCard: {
        width: '44%',
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 5,
        position: "relative",
        marginBottom: 20,
        shadowColor: '#808adad9',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.4,
        shadowRadius: 35,
        elevation: 23,
        backgroundColor: '#111',
        borderWidth: 0.35,
        borderColor: 'rgba(124,113,192,0.65)'
    },

    darkTextContent: {
        textAlign: "center",
        marginBottom: 8,
        color: 'floralwhite',
    },

    darkAfterElement: {
        position: "absolute",
        borderRadius: 20,
        width: "87%",
        height: 25,
        top: "31%",
        left: "7%",
        zIndex: -1,
        borderColor: 'rgba(124,113,192,0.65)',
        borderBottomWidth: 2,
    },

});