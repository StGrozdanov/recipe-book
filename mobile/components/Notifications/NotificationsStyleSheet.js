import { StyleSheet } from "react-native";

export const notificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 20,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 11,
        shadowRadius: 20,
    },

    section: {
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(124,113,192,0.6)',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        position: "relative",
    },

    leftUserSectionContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },

    rightUserSectionContent: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 12,
    },

    text: {
        fontSize: 13,
        fontWeight: '300',
        color: 'white',
    },

    sender: {
        fontSize: 15,
        fontWeight: '400',
    },  

});