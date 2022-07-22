import { TouchableOpacity, View, Image, Text, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { notificationStyles } from './NotificationsStyleSheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { markNotificationAsRead } from '../../services/notificationService';

const actionTranslator = {
    коментар: 'comment',
    рецепта: 'recipe',
}

export default function NotificationCard({ action, locationId, objectId, senderAvatar, senderName, createdAt }) {
    const [notificationDismissed, setNotificationDismissed] = useState(false);
    const navigator = useNavigation();

    async function redirectHandler(action, locationId, notificationId) {
        let collectionName = action.split(' ')[1];
        collectionName = actionTranslator[collectionName];
        const path = collectionName.substring(0, 1).toUpperCase() + 
                    collectionName.substring(1, collectionName.length) + 's';

        await markNotificationAsRead(notificationId);
        setNotificationDismissed(true);

        navigator.navigate(path, {
            itemId: locationId,
        });
    }

    async function dismissHandler(notificationId) {
        await markNotificationAsRead(notificationId);
        setNotificationDismissed(true);
    }

    return (
        notificationDismissed
            ? null
            :
            <TouchableOpacity onPress={() => redirectHandler(action, locationId, objectId)}>
                <View style={notificationStyles.section} >
                    <View style={notificationStyles.leftUserSectionContent}>
                        {
                            senderAvatar && senderAvatar !== 'null'
                                ? <Image
                                    source={{ uri: senderAvatar }}
                                    style={notificationStyles.avatar}
                                />
                                : <Image
                                    style={notificationStyles.avatar}
                                    source={require('../../assets/avatar.png')}
                                />
                        }
                        <Text style={notificationStyles.text}>
                            <Text style={notificationStyles.sender}>{senderName + ' '}</Text>
                            {action + ', ' + createdAt.replace('T', ', ').substring(5, 17) + ' '}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[notificationStyles.rightUserSectionContent]}
                        onPress={() => dismissHandler(objectId)}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={notificationStyles.text}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
    );
}