import { View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { adminPanelNav } from './NavigationStyleSheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons/faUserLarge';
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useThemeContext } from "../../hooks/useThemeContext";

export default function Navigation() {
    const navigationRoute = useRoute();
    const navigator = useNavigation();
    const { theme } = useThemeContext();

    const currentPageName = navigationRoute.name;

    return (
        <View style={adminPanelNav[theme + 'Navigation']}>
                <Image style={adminPanelNav[theme + 'WebsiteLogo']} source={require('../../assets/cooking.png')} />
                <TouchableOpacity onPress={() => navigator.navigate('Dashboard')}>
                    <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faChartSimple} />
                    <ImageBackground style={currentPageName == 'Dashboard' && adminPanelNav.selected} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate('Users')}>
                    <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faUserLarge} />
                    <ImageBackground style={currentPageName == 'Users' && adminPanelNav.selected} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate('Recipes')}>
                    <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faBowlRice} />
                    <ImageBackground style={currentPageName == 'Recipes' && adminPanelNav.selected} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate('Comments')}>
                    <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faCommentDots} />
                    <ImageBackground style={currentPageName == 'Comments' && adminPanelNav.selected} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigator.navigate('Settings')}>
                    <FontAwesomeIcon style={adminPanelNav[theme + 'NavItem']} size={26} icon={faGear} />
                    <ImageBackground style={currentPageName == 'Settings' && adminPanelNav.selected} />
                </TouchableOpacity>            
            </View>
    );
}