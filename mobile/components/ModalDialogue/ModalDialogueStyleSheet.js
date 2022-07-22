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
    },

    darkMessage: {
        color: 'floralwhite',
        textAlign: 'center',
        lineHeight: 25,
    }

});