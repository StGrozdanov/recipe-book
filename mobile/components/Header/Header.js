import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import { faMoon } from '@fortawesome/free-regular-svg-icons/faMoon';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { faUserLarge } from "@fortawesome/free-solid-svg-icons/faUserLarge";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons/faCommentDots";
import { faBowlRice } from "@fortawesome/free-solid-svg-icons/faBowlRice";
import { headerStyle } from "./HeaderStyleSheet";
import { greetingGenerator } from "../../helpers/headerGreetingGenerator";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSearchContext } from "../../hooks/useSearchContext";
import { userAvatarIsPresent } from "../../helpers/avatarIsPresent";
import { globalSearchAdmin, searchByRecipeNameAdmin } from "../../services/filtrationService";
import { searchUsersByUsername } from "../../services/userService";
import { searchComments } from "../../services/commentService";
import { actionsDropdownStyles } from "../ActionsDropdown/ActionsDropdownStyleSheet";
import { actionStyles } from "../Actions/ActionsStyleSheet";

const searchLocations = {
    Users: (query) => searchUsersByUsername(query),
    Recipes: (query) => searchByRecipeNameAdmin(query),
    Comments: (query) => searchComments(query),
}

export default function Header({ notificationsCount, markNotificationsAsSeen }) {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [globalSearch, setGlobalSearch] = useState(false);
    const [globalSearchResults, setGlobalSearchResults] = useState([]);
    const { theme, changeTheme } = useThemeContext();
    const { user } = useAuthContext();
    const { setSearch } = useSearchContext();
    const navigationRoute = useRoute();
    const navigator = useNavigation();
    const currentPageName = navigationRoute.name;

    const iconTypes = {
        users: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color={'floralwhite'} size={16} icon={faUserLarge} />,
        comments: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color={'floralwhite'} size={16} icon={faCommentDots} />,
        recipes: <FontAwesomeIcon style={actionStyles[theme + 'SearchIcons']} color={'floralwhite'} size={16} icon={faBowlRice} />,
    }

    useEffect(() => {
        if (searchValue !== null) {
            if (searchLocations.hasOwnProperty(currentPageName)) {
                searchLocations[currentPageName](searchValue)
                    .then(res => {
                        setSearch({ results: res.content, collection: currentPageName });
                    });
            } else {
                if (searchValue.trim() !== '') {
                    setGlobalSearch(true);
                    globalSearchAdmin(searchValue)
                        .then(res => {
                            setGlobalSearchResults(res);
                        });
                } else {
                    setGlobalSearch(false);
                }

            }
        }
    }, [searchValue])

    const currentHour = new Date(Date.now()).getHours();
    const headerMessageGenerator = greetingGenerator(currentPageName, currentHour);

    async function changeThemeHandler() {
        if (theme == 'light') {
            await changeTheme('dark');
        } else {
            await changeTheme('light');
        }
    }

    function searchBarHandler() {
        if (showSearchBar) {
            setShowSearchBar(false);
            setGlobalSearch(false);
        } else {
            setShowSearchBar(true);
        }
    }

    function showNotificationsHandler() {
        markNotificationsAsSeen();
        navigator.navigate('Notifications');
    }

    function searchRedirectHandler(query, location) {
        location = location.charAt(0).toUpperCase() + location.substring(1);
        searchLocations[location](query).then(res => setSearch({ results: res.content, collection: location }));
        navigator.navigate(location);
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
                    onChangeText={(text) => setSearchValue(text)}
                />
                {
                    globalSearch &&
                    <ScrollView
                        style={actionsDropdownStyles[theme + 'SearchContainer']}
                        nestedScrollEnabled={true}
                    >
                        {
                            globalSearchResults.map(result => {
                                return (
                                    <TouchableOpacity
                                        style={actionStyles.searchAction}
                                        onPress={() => searchRedirectHandler(result.name, result.resultType)}
                                        key={result.name}
                                    >
                                        {iconTypes[result.resultType]}
                                        <Text style={actionStyles.text}>{result.name}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                }
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']} onPress={searchBarHandler}>
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme == 'light' ? 18 : 21.5}
                        icon={faMagnifyingGlass}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={headerStyle[theme + 'IconContainer']} onPress={showNotificationsHandler}>
                    {notificationsCount > 0 &&
                        <Text style={headerStyle[theme + 'NotificationCounter']}>{notificationsCount}</Text>
                    }
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme == 'light' ? 20 : 24}
                        icon={faBell}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={changeThemeHandler} >
                    <FontAwesomeIcon
                        style={headerStyle[theme + 'Icons']}
                        size={theme == 'light' ? 20 : 24}
                        icon={theme == 'light' ? faMoon : faLightbulb}
                    />
                </TouchableOpacity>
                {
                    userAvatarIsPresent(user.avatarUrl)
                        ? <Image
                            source={{ uri: user.avatarUrl }}
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