import { StyleSheet } from "react-native";

export const userStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 11,
        shadowRadius: 20,
    },

    userSection: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        position: "relative",
    },

    avatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 30,
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

    dots: {
        fontSize: 22,
    },

    text: {
        fontSize: 17,
        fontWeight: '300',
    },

    whiteText: {
        color: 'white',
    },

    iconText: {
        color: '#808adad9',
    },

    icon: {
        position: "absolute",
        top: '50%',
        left: '3%',
    },  

    additionalData: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-evenly",
        paddingVertical: 30,
    },

    additionalDataHeading: {
        marginBottom: 10,
        fontWeight: '400',
        textAlign: 'center',
    },

    additionalDataContent: {
        textAlign: "center",
        fontWeight: "300",
    },

    toggledData: {
        display: "none",
    },

    online: {
        color: 'green',
        fontWeight: '400',
        borderWidth: 0.8,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: "#2ac99111",
        borderColor: "green",
    },

    offline: {
        color: 'red',
        fontWeight: '400',
        borderWidth: 0.8,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: "#ff000010",
        borderColor: "red",
    }

});