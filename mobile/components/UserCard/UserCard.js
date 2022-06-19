import { Text, View, Image } from 'react-native';
import { userCardStyles } from './UserCardStyleSheet';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBowlRice } from '@fortawesome/free-solid-svg-icons/faBowlRice';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons/faCommentDots';

export default function UserCard({ mostActiveUserName, totalPublications, recipesCount, commentsCount }) {
    return (
        <View style={userCardStyles.card}>
            <View style={userCardStyles.cardTextSection}>
                <Text style={userCardStyles.title}>Най-активен потребител:</Text>
                <Text style={[userCardStyles.title, userCardStyles.userName]}>{mostActiveUserName}</Text>
            </View>
            <View style={ userCardStyles.avatarContainer }>
                <Image style={userCardStyles.avatar} source={require('../../assets/avatar.png')} />
            </View>
            <View style={userCardStyles.cardMainSection}>
                <Text
                    style={[userCardStyles.title, userCardStyles.publications]}
                >
                    {totalPublications} Публикации
                </Text>
                <View style={userCardStyles.publicationStats}>
                    <View>
                        <FontAwesomeIcon icon={faBowlRice} style={userCardStyles.icons} size={20} />
                        <Text
                            style={[userCardStyles.title, userCardStyles.publicationsCounts]}
                        >
                            {recipesCount}12 рецепети
                        </Text>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faCommentDots} style={userCardStyles.icons} size={20} />
                        <Text
                            style={[userCardStyles.title, userCardStyles.publicationsCounts]}
                        >
                            {commentsCount}12 коментара
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}