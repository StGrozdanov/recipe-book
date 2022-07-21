import { StyleSheet } from "react-native";

export const userCardStyles = StyleSheet.create({
    lightCard: {
        borderRadius: 25,
        height: 390,
        width: '57%',
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: 'rgba(111,115,255, 0.061)',
        shadowColor: 'rgba(111,115,255, 0.2)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 25,
        elevation: 80,
        position: "relative",
    },

    lightCardTextSection: {
        paddingVertical: 30,
        backgroundColor: 'white',
        borderRadius: 25,
        height: '45%',
    },

    lightTitle: {
        textAlign: "center",
        marginBottom: 5,
        color: 'black',
    },

    lightUsernameContainer: {
        color: '#55595c', 
        textAlign: 'center', 
        marginTop: '35%', 
        marginBottom: '10%', 
        fontSize: 18, 
        fontWeight: '400',
    },

    darkUsernameContainer: {
        color: "floralwhite",
        textAlign: 'center', 
        marginTop: '35%', 
        marginBottom: '10%', 
        fontSize: 18, 
        fontWeight: '400',
    },

    userName: {
        fontWeight: '600',
        fontSize: 15,
    },

    lightPublications: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 25,
        marginTop: 60,
    },

    publicationsCounts: {
        fontSize: 15,
    },

    cardMainSection: {
        height: '50%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: 12,
    },

    publicationStats: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    icons: {
        alignSelf: 'center',
        color: '#483d8bba',
    },

    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },

    lightAvatarContainer: {
        backgroundColor: 'white',
        zIndex: 1,
        width: '60%',
        height: '35%',
        borderRadius: 50,
        position: "absolute",
        top: "26%",
        left: "20%",
        paddingHorizontal: 20,
    },

    darkCard: {
        borderRadius: 25,
        height: 390,
        width: '57%',
        alignSelf: 'center',
        marginVertical: 40,
        shadowColor: 'rgba(111,115,255, 0.2)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 25,
        elevation: 80,
        position: "relative",
        backgroundColor: "#111",
        borderColor: 'rgba(124,113,192,0.65)',
        borderWidth: 0.3,
    },

    darkCardTextSection: {
        paddingVertical: 30,
        borderRadius: 25,
        height: '45%',
        backgroundColor: 'rgba(124,113,192,0.32)'
    },

    darkTitle: {
        textAlign: "center",
        marginBottom: 5,
        color: "floralwhite",
    },

    darkPublications: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 25,
        marginTop: 80,
    },

    darkAvatarContainer: {
        zIndex: 1,
        width: '50%',
        height: '30%',
        borderRadius: 50,
        position: "absolute",
        top: "28%",
        left: "24%",
        paddingHorizontal: 20,
        backgroundColor: 'floralwhite',
    },

    randomStyle: {
        flex: 1,
        width: '80%'
    }

});