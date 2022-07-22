import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import * as Device from 'expo-device';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const headerStyle = StyleSheet.create({
    lightContainer: {
        flex: 0.19,
        marginTop: 40,
        borderBottomWidth: 5,
        borderEndWidth: 1,
        borderStartWidth: 1,
        borderRadius: 25,
        borderBottomColor: 'white',
        borderEndColor: 'white',
        borderStartColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 5,
    },

    lightAvatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },

    lightIconContainer: {
        borderRadius: 50,
        padding: 8,
        backgroundColor: 'white',
    },

    lightIcons: {
        borderRadius: 50,
        color: '#55595c',
    },  

    leftSection: {
        width: '42%',
    },

    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        width: '44%',
        zIndex: 5,
    },

    lightCurrentPage: {
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#55595c',
        fontSize: 12,
        textAlign: 'center',
    },

    lightGreetingText: {
        fontWeight: '800',
        fontSize: 16,
        color: '#55595c',
        marginBottom: 5,
        textAlign: 'center',
    },

    lightSearchBar: {
        position: 'absolute',
        backgroundColor: 'white',
        width: windowWidth * 0.5,
        padding: Device.brand !== 'Apple' ? 2 : 6,
        textAlign: 'center',
        opacity: 1,
        zIndex: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        right: windowWidth * 0.2,
        top: windowHeight * 0.065,
    },

    lightNotificationCounter: {
        color: 'white',
        borderRadius: 50,
        backgroundColor: 'red',
        textAlign: 'center',
        paddingVertical: 3,
        fontSize: 8,
        width: 17,
        height: 17,
        position: 'absolute',
        top: -7,
        right: 0,
    },

    darkContainer: {
        flex: 0.19,
        marginTop: 40,
        borderBottomWidth: 5,
        borderEndWidth: 1,
        borderStartWidth: 1,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomColor: 'rgba(124,113,192,0.65)',
        borderEndColor: '#111',
        borderStartColor: '#111',
        zIndex: 5,
    },

    darkIconContainer: {
        borderRadius: 50,
        padding: 0,
        backgroundColor: '#111',
    },

    darkIcons: {
        borderRadius: 50,        
        color: 'rgba(124,113,192,0.65)',
    }, 

    darkNotificationCounter: {
        color: 'white',
        borderRadius: 50,
        backgroundColor: 'red',
        textAlign: 'center',
        paddingVertical: 3,
        fontSize: 8,
        width: 17,
        height: 17,
        position: 'absolute',
        top: -15,
        right: -8,
    },

    darkCurrentPage: {
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: 'center',
        color: 'floralwhite',
    },

    darkGreetingText: {
        fontWeight: '800',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
        color: 'floralwhite',
    },

    darkSearchBar: {
        position: 'absolute',
        width: windowWidth * 0.5,
        padding: Device.brand !== 'Apple' ? 2 : 6,
        textAlign: 'center',
        zIndex: 5,
        backgroundColor: 'rgba(124,113,192,0.95)',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        right: windowWidth * 0.2,
        top: windowHeight * 0.102,
    },

    darkAvatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        opacity: 0.8,
    },

});