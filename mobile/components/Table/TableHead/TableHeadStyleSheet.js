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

    darkSection: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        position: "relative",
        backgroundColor: "floralwhite",
    },

    darkEvenItem: {
        backgroundColor: 'rgba(124,113,192,0.6)',
    },

    darkFirstItem: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopWidth: 5,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(124,113,192,0.6)'
    },

    darkLastItem: {
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderBottomWidth: 5,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'rgba(124,113,192,0.6)'
    },

    darkWhiteText: {
        color: 'floralwhite',
    },

    darkAvatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginRight: 20,
        backgroundColor: 'floralwhite',
    },

}); 