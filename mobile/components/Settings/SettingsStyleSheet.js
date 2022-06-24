import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        marginBottom: 5,
        marginHorizontal: 10,
        borderRadius: 25,
        shadowColor: '#808adad9',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 11,
        shadowRadius: 20,
        alignItems: "center",
    },

    touchable: {
        flexDirection: "row",
        width: 180,
        justifyContent: "space-evenly",
        alignItems: "center",
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
    }
});