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
    },

    icons: {
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

    currentPage: {
        fontWeight: '400',
        fontStyle: 'italic',
        color: '#55595c',
        fontSize: 12,
        textAlign: 'center',
    },

    greetingText: {
        fontWeight: '800',
        fontSize: 16,
        color: '#55595c',
        marginBottom: 5,
        textAlign: 'center',
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
    }

});