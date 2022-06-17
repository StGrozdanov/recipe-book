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

export default function Header() {
    const [colorTheme, setColorTheme] = useState('light');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const navigationRoute = useRoute();

    const currentPageName = navigationRoute.name;
    const currentHour = new Date(Date.now()).getHours();
    const headerMessageGenerator = greetingGenerator(currentPageName, currentHour);

    function changeThemeHandler() {
        colorTheme == 'light' ? setColorTheme('dark') : setColorTheme('light');
    }

    function searchBarHandler() {
        showSearchBar ? setShowSearchBar(false) : setShowSearchBar(true);
    }

    return (
        <View style={headerStyle.container}>
            <View style={headerStyle.leftSection}>
                <Text style={headerStyle.greetingText}>{headerMessageGenerator.greeting}, shushan</Text>
                <Text style={headerStyle.currentPage}>{headerMessageGenerator.message}</Text>
            </View>
            <View style={headerStyle.rightSection}>
                <View style={{ position: "absolute", top: "55%", left: "50%" }} >
                    <TextInput
                        style={showSearchBar ? headerStyle.searchBar : { display: 'none' }}
                        placeholder='type to search...'
                        selectionColor={'#55595c'}
                    />
                </View>
                <TouchableOpacity style={headerStyle.iconContainer} onPress={searchBarHandler}>
                    <FontAwesomeIcon style={headerStyle.icons} size={18} icon={faMagnifyingGlass} />
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle.iconContainer}>
                    <FontAwesomeIcon style={headerStyle.icons} size={20} icon={faBell} />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeThemeHandler} >
                    <FontAwesomeIcon
                        style={headerStyle.icons}
                        size={22}
                        icon={colorTheme == 'light' ? faMoon : faLightbulb}
                    />
                </TouchableOpacity>
                <Image style={headerStyle.avatar} source={require('../../assets/Avatar.png')} />
            </View>
        </View>
    );
}