import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const loginStyles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        width: '100%',
    },

    formWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    heading: {
        position: 'absolute',
        top: '16%',
        left: '10%',
        transform: [
            { translateY: -50 },
        ],
        color: 'white',
        fontSize: 40,
        fontWeight: "900",
    },

    secondHeading: {
        position: 'absolute',
        top: '25%',
        left: '14%',
        transform: [
            { translateY: -50 },
        ],
        color: 'white',
        fontSize: 25,
        fontWeight: "400",
    },

    thirdHeading: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        transform: [
            { translateY: -50 },
        ],
        color: 'white',
        fontSize: 16,
    },

    errorHeading: {
        top: '32%',
        textAlign: 'center',
        color: 'red',
        fontSize: 17,
        fontWeight: '600',
    },

    inputWrapper: {
        width: '75%',
        position: 'relative',
    },

    input: {
        borderBottomColor: 'lightsteelblue',
        borderBottomWidth: 0.8,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginBottom: 20,
        color: 'white',
        position: 'relative',
        fontSize: 18,
    },

    button: {
        marginTop: 30,
        paddingVertical: 12,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '75%',
    },

    buttonText: {
        color: 'black',
        textAlign: 'center',
    },

    loadingSpinner: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: windowHeight * 0.25,
        left: windowWidth * 0.25,
    }
})