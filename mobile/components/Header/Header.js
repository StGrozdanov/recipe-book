import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faMoon } from '@fortawesome/free-regular-svg-icons/faMoon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { headerStyle } from "./HeaderStyleSheet";
import { greetingGenerator } from "../../helpers/headerGreetingGenerator";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function Header() {
    const [colorTheme, setColorTheme] = useState('light');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const { theme, changeTheme } = useThemeContext();
    const navigationRoute = useRoute();

    const currentPageName = navigationRoute.name;
    const currentHour = new Date(Date.now()).getHours();
    const headerMessageGenerator = greetingGenerator(currentPageName, currentHour);

    async function changeThemeHandler() {
        if (colorTheme == 'light') {
            setColorTheme('dark');
            await changeTheme('dark');
        } else {
            setColorTheme('light');
            await changeTheme('light');
        }
    }

    function searchBarHandler() {
        showSearchBar ? setShowSearchBar(false) : setShowSearchBar(true);
    }

    return (
        <View style={headerStyle[theme + 'Container']}>
            <View style={headerStyle.leftSection}>
                <Text style={headerStyle[theme + 'GreetingText']}>{headerMessageGenerator.greeting}, shushan</Text>
                <Text style={headerStyle[theme + 'CurrentPage']}>{headerMessageGenerator.message}</Text>
            </View>
            <View style={headerStyle.rightSection}>
                <TextInput
                    style={showSearchBar ? headerStyle[theme + 'SearchBar'] : { display: 'none' }}
                    placeholder='type to search...'
                    selectionColor={'#55595c'}
                />
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']} onPress={searchBarHandler}>
                    <FontAwesomeIcon style={headerStyle[theme + 'Icons']} size={18} icon={faMagnifyingGlass} />
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']}>
                    <FontAwesomeIcon style={headerStyle[theme + 'Icons']} size={20} icon={faBell} />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeThemeHandler} >
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={22}
                        icon={colorTheme == 'light' ? faMoon : faLightbulb}
                    />
                </TouchableOpacity>
                <Image style={headerStyle.avatar} source={require('../../assets/avatar.png')} />
            </View>
        </View>
    );
}