import { StyleSheet, Platform } from "react-native";

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
        width: '44%'
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
        width: 200,
        padding: 5,
        textAlign: 'center',
        opacity: 1,
        zIndex: 5,
        borderTopLeftRadius: Platform.OS == 'android' ? 30 : 20,
        borderTopRightRadius: Platform.OS == 'android' ? 30 : 20,
        borderBottomRightRadius: Platform.OS == 'android' ? 10 : 20,
        borderBottomLeftRadius: Platform.OS == 'android' ? 10 : 20,
        top: Platform.OS == 'ios' ? '60%' : '41%',
        right: Platform.OS == 'ios' ? '50%' : '50%',
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
    },

    darkIconContainer: {
        borderRadius: 50,
        padding: 8,
        backgroundColor: '#111',
    },

    darkIcons: {
        borderRadius: 50,        
        color: 'rgba(124,113,192,0.65)',
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
        width: 200,
        padding: 5,
        textAlign: 'center',
        zIndex: 5,
        backgroundColor: Platform.OS == 'android' ? 'rgba(124,113,192,0.86)' : 'rgba(124,113,192,1)',
        borderTopLeftRadius: Platform.OS == 'android' ? 30 : 20,
        borderTopRightRadius: Platform.OS == 'android' ? 30 : 20,
        borderBottomRightRadius: Platform.OS == 'android' ? 10 : 20,
        borderBottomLeftRadius: Platform.OS == 'android' ? 10 : 20,
        top: Platform.OS == 'ios' ? '60%' : '41%',
        right: Platform.OS == 'ios' ? '50%' : '50%',
    },

    darkAvatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        opacity: 0.8,
    },

});