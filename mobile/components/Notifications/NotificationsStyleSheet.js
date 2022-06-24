import { StyleSheet } from "react-native";

export const notificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 11,
        shadowRadius: 20,
    },

    section: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'orange',
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
        marginRight: 20,
    },

    text: {
        fontSize: 15,
        fontWeight: '300',
        color: 'white'
    },

});