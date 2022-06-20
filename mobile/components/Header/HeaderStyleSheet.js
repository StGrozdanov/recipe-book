import { StyleSheet } from "react-native";

export const headerStyle = StyleSheet.create({
    container: {
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

        borderBottomColor: 'rgba(124,113,192,0.65)',
        borderEndColor: '#111',
        borderStartColor: '#111',
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },

    iconContainer: {
        borderRadius: 50,
        padding: 8,
        backgroundColor: 'white',

        backgroundColor: '#111',
    },

    icons: {
        borderRadius: 50,
        color: '#55595c',

        color: 'rgba(124,113,192,0.65)',
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

    currentPage: {
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#55595c',
        fontSize: 12,
        textAlign: 'center',

        color: 'floralwhite',
    },

    greetingText: {
        fontWeight: '800',
        fontSize: 16,
        color: '#55595c',
        marginBottom: 5,
        textAlign: 'center',

        color: 'floralwhite',
    },

    searchBar: {
        position: 'absolute',
        top: '60%',
        right: '50%',
        backgroundColor: 'white',
        width: 200,
        padding: 5,
        textAlign: 'center',
        borderRadius: 20,

        backgroundColor: 'floralwhite',
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
        top: '60%',
        right: '50%',
        width: 200,
        padding: 5,
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: 'floralwhite',
    },

});