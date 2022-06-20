import { StyleSheet } from "react-native";

export const adminPanelNav = StyleSheet.create({
    navigation: {
        flex: 0.07,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
        shadowColor: '#808ada91',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        borderWidth: 0.4,
        borderColor: '#808ada82',
    },

    websiteLogo: {
        width: 37,
        height: 37,
    },

    navItem: {
        color: '#483d8bba',
    },
    
    selected: {
        backgroundColor: '#6f42c1',
        position: 'absolute',
        width: 25.5,
        height: 4,
        bottom: '-25%',
    },

    darkNavigation: {
        flex: 0.07,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomLeftRadius: 33,
        borderBottomRightRadius: 33,
        shadowColor: '#808ada91',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        borderWidth: 0.4,
        borderColor: 'rgba(124,113,192,0.65)',
    },

    darkNavItem: {        
        color: "rgba(124,113,192,0.65)",
    },

    darkWebsiteLogo: {
        width: 37,
        height: 37,
        opacity: 0.55,
    },
});