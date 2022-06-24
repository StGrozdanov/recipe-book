import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const loadingScreenStyles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        width: '100%',
    },

    loadingSpinner: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: windowHeight * 0.5,
        left: windowWidth * 0.18,
    },

    logo: {
        width: 200,
        height: 200,
        position: "absolute",
        left: windowWidth * 0.27,
        top: windowHeight * 0.3,
    },

    heading: {
        position: "absolute",
        left: windowWidth * 0.16,
        top: windowHeight * 0.2,
        fontSize: 27,
        fontWeight: '800',
        color: 'plum',
        color: 'steelblue',
    }
});