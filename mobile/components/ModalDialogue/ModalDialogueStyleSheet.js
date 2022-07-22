import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 25,
        elevation: 20,
    },

    message: {
        textAlign: 'center',
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
        backgroundColor: 'green',
    },

    buttonText: {
        color: 'white', 
    },

    cancelButton: {
        borderRadius: 25, 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        backgroundColor: 'red',
    },

});