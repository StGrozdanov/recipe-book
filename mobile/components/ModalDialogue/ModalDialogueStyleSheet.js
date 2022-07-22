import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    lightModalContainer: {
        width: '80%',
        backgroundColor: '#c2c2e9',
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 25,
        elevation: 20,
        position: 'relative',
    },

    lightMessage: {
        textAlign: 'center',
        lineHeight: 25,
    },

    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 40,
    },

    confirmButton: {
        borderRadius: 25,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#0080008a',
    },

    buttonText: {
        color: 'white',
    },

    cancelButton: {
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ff00008a',
    },

    darkModalContainer: {
        backgroundColor: 'rgba(124,113,192,1)',
        width: '80%',
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 25,
        elevation: 20,
        position: "relative",
    },

    darkMessage: {
        color: 'floralwhite',
        textAlign: 'center',
        lineHeight: 25,
    },

    xMark: {
        position: 'absolute',
        top: '10%',
        right: '7%',
        fontWeight: '1000',
    },

    optionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        marginTop: 20,
    },

    lightOptionsText: {
        marginLeft: 11,
        fontSize: 15,
        alignSelf: "center",
    },

    darkOptionsText: {
        marginLeft: 11,
        color: 'floralwhite',
        fontSize: 15,
        alignSelf: "center",
    },

    lightOptionColor: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(124,113,192,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    darkOptionColor: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'floralwhite',
        alignItems: 'center',
        justifyContent: 'center',
    },

    lightSelectColor: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: 'rgba(124,113,192,0.45)',
    },

    darkSelectColor: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: 'floralwhite',
    },

    lightInput: {
        borderBottomColor: 'rgba(124,113,192,0.9)',
        borderBottomWidth: 0.8,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginBottom: 20,
        position: 'relative',
        fontSize: 18,
        textAlign: 'center',
    },

    darkInput: {
        borderBottomColor: 'floralwhite',
        color: 'floralwhite',
        borderBottomWidth: 0.8,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginBottom: 20,
        position: 'relative',
        fontSize: 18,
        textAlign: 'center',
    },

});