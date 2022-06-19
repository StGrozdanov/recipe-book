import { StyleSheet } from "react-native";

export const tableHeadStyles = StyleSheet.create({
    section: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        position: "relative",
    },

    evenItem: {
        backgroundColor: 'rgba(124,113,192,0.28)',
    },

    firstItem: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    lastItem: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    icon: {
        position: "absolute",
        top: '50%',
        left: '3%',
    },  

    whiteText: {
        color: 'white',
    },

    iconText: {
        color: '#808adad9',
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
    },

}); 