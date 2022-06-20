import { Text, View, Image } from 'react-native';
import { userCardStyles } from './UserCardStyleSheet';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';
import { useThemeContext } from "../../contexts/ThemeContext";

export default function UserCard({ mostActiveUserName, totalPublications, recipesCount, commentsCount }) {
    const { theme } = useThemeContext();

    return (
        <View style={userCardStyles[theme + 'Card']}>
            <View style={userCardStyles[theme + 'CardTextSection']}>
                <Text style={userCardStyles[theme + 'Title']}>Най-активен потребител:</Text>
                <Text style={[userCardStyles[theme + 'Title'], userCardStyles.userName]}>{mostActiveUserName}</Text>
            </View>
            <View style={ userCardStyles[theme + 'AvatarContainer'] }>
                <Image style={userCardStyles.avatar} source={require('../../assets/avatar.png')} />
            </View>
            <View style={userCardStyles.cardMainSection}>
                <Text
                    style={[userCardStyles[theme + 'Title'], userCardStyles[theme + 'Publications']]}
                >
                    {totalPublications} Публикации
                </Text>
                <View style={userCardStyles.publicationStats}>
                    <View>
                        <FontAwesomeIcon icon={faBowlRice} style={userCardStyles.icons} size={20} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {recipesCount}12 рецепети
                        </Text>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faCommentDots} style={userCardStyles.icons} size={20} />
                        <Text
                            style={[userCardStyles[theme + 'Title'], userCardStyles.publicationsCounts]}
                        >
                            {commentsCount}12 коментара
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}