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
import { useThemeContext } from "../../hooks/useThemeContext";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { socket } from '../../services/socketioService';

export default function Header() {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const { theme, changeTheme } = useThemeContext();
    const { user } = useAuthContext();
    const navigationRoute = useRoute();

    const currentPageName = navigationRoute.name;
    const currentHour = new Date(Date.now()).getHours();
    const headerMessageGenerator = greetingGenerator(currentPageName, currentHour);

    // socket.emit("newUser", user.objectId);
    // socket.on("receiveNotification", data => {
    //     let notificationIcon = document.getElementById('myProfileLinkNotificationIcon');
    //     notificationIcon.style.display = 'inline-block';
    
    //     let notificationCounterContainer = document.getElementById('myProfileNavNotificationCounter')
    //     notificationCounterContainer.style.display = 'inline-block';
    //     let counterValue = Number(notificationCounterContainer.textContent);
    //     let newCounterValue = counterValue + 1;
    //     notificationCounterContainer.textContent = newCounterValue;
    // });

    async function changeThemeHandler() {
        if (theme == 'light') {
            await changeTheme('dark');
        } else {
            await changeTheme('light');
        }
    }

    function searchBarHandler() {
        showSearchBar ? setShowSearchBar(false) : setShowSearchBar(true);
    }

    return (
        <View style={headerStyle[theme + 'Container']}>
            <View style={headerStyle.leftSection}>
                <Text
                    style={headerStyle[theme + 'GreetingText']}
                >
                    {headerMessageGenerator.greeting}, {user.username}
                </Text>
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
                    <Text style={headerStyle.notificationCounter}>5</Text>
                    <FontAwesomeIcon style={headerStyle[theme + 'Icons']} size={20} icon={faBell} />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeThemeHandler} >
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={22}
                        icon={theme == 'light' ? faMoon : faLightbulb}
                    />
                </TouchableOpacity>
                {
                    user.avatar !== undefined
                        ? <Image
                            source={{ uri: user.avatar }}
                            style={headerStyle[theme + 'Avatar']}
                        />
                        : <Image
                            style={headerStyle[theme + 'Avatar']}
                            source={require('../../assets/avatar.png')}
                        />
                }
            </View>
        </View>
    );
}