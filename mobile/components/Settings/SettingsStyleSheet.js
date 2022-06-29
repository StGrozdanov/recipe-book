import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 11,
        shadowRadius: 0,
        alignItems: "center",
    },

    lightTouchable: {
        flexDirection: "row",
        width: 180,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: 13,
        borderBottomWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: 'white',
        marginBottom: 40,
    },

    lightLogoutText: {
        fontSize: 20,
        color: 'rgba(124,113,192,1)',
        fontWeight: '500'
    },

    lightIcon: {
        color: 'rgba(124,113,192,1)',
        position: "absolute",
        left: 0,
        top: 0,
    },

    darkLogoutText: {
        fontSize: 20,
        color: 'rgba(124,113,192,0.6)',
        fontWeight: '500'
    },

    darkIcon: {
        color: 'rgba(124,113,192,0.6)',
        position: "absolute",
        left: 0,
        top: 0,
    },

    darkTouchable: {
        flexDirection: "row",
        width: 180,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: 13,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomColor: 'rgba(124,113,192,1)',
        marginBottom: 40,
    },
});