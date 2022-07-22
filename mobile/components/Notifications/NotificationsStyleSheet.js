import { StyleSheet } from "react-native";

export const notificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 5,
        marginHorizontal: 15,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 15,
        shadowRadius: 2,
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
        width: 35,
        height: 35,
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

    noNotificationsText: {
        flex: 1,
        textAlign: 'center',
        marginTop: '50%',
        fontSize: 20,
        color: 'rgba(124,113,192,1)'
    },

});