import { Text, View, Image } from 'react-native';
import { userCardStyles } from './UserCardStyleSheet';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { useThemeContext } from "../../hooks/useThemeContext";
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userService';

export default function UserProfile() {
    const { theme } = useThemeContext();
    const route = useRoute();
    const userId = route.params.itemId;
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUser(userId)
        .then(user => setUserData(user))
        .catch(err => console.log(err.message));
    }, []);

    return (
        <View style={[userCardStyles[theme + 'Card'], userCardStyles.randomStyle]}>
            <View style={userCardStyles[theme + 'CardTextSection']}></View>
            <View style={userCardStyles[theme + 'AvatarContainer'] }>
                {userData.avatarUrl && userData.avatarUrl !== '/avatar.png' 
                        ? <Image
                            source={{ uri: userData.avatarUrl }}
                            style={userCardStyles.avatar}
                        />
                        : <Image style={userCardStyles.avatar} source={require('../../assets/avatar.png')} />
                }
            </View>
            <View style={userCardStyles.cardMainSection}>
                <Text style={userCardStyles[theme + 'UsernameContainer']}>{userData.username}</Text>
                <View style={userCardStyles.publicationStats}>
                    <View>
                        <FontAwesomeIcon icon={faBowlRice} style={userCardStyles.icons} size={30} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {userData.recipesCount} created
                        </Text>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faEnvelope} style={userCardStyles.icons} size={30} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {userData.email}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}