import { StyleSheet } from "react-native";

export const userCardStyles = StyleSheet.create({
    card: {
        borderRadius: 25,
        height: 390,
        width: '57%',
        alignSelf: 'center',
        marginVertical: 40,
        backgroundColor: 'rgba(111,115,255, 0.061)',
        shadowColor: 'rgba(111,115,255, 0.2)',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.6,
        shadowRadius: 25,
        elevation: 80,
        position: "relative",

        backgroundColor: "#111",
        borderColor: 'rgba(124,113,192,0.65)',
        borderWidth: 0.3,
    }, 

    cardTextSection: {
        paddingVertical: 30,
        backgroundColor: 'white',
        borderRadius: 25,
        height: '45%',

        backgroundColor: 'rgba(124,113,192,0.32)'
    },

    title: {
        textAlign: "center",
        marginBottom: 5,
        color: '#55595c',

        color: "floralwhite",
    },

    userName: {
        fontWeight: '600',
        fontSize: 15,
    },

    publications: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 25,
        marginTop: 60,

        marginTop: 80,
    },

    publicationsCounts: {
        fontSize: 12,
    },

    cardMainSection: {
        height: '50%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: 12,
    },

    publicationStats: {
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

    avatarContainer: {
        backgroundColor: 'white',
        zIndex: 1,
        width: '60%',
        height: '35%',
        borderRadius: 50,
        position: "absolute",
        top: "26%",
        left: "20%",
        paddingHorizontal: 20,

        backgroundColor: 'floralwhite',
    }
});