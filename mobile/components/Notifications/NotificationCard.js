import { TouchableOpacity, View, Image, Text, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { notificationStyles } from './NotificationsStyleSheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function NotificationCard({ action, locationId, objectId, senderAvatar, senderName, createdAt }) {
    const [notificationDismissed, setNotificationDismissed] = useState(false);
    const navigator = useNavigation();

    function redirectHandler(action, locationId, notificationId) {
        let collectionName = action.split(' ')[1];
        const path = collectionName.substring(0, 1).toUpperCase() + collectionName.substring(1, collectionName.length) + 's';

        navigator.navigate(path, {
            itemId: locationId,
        });
    }

    function dismissHandler(notificationId) {
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
                            senderAvatar
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
                            {senderName + ' ' + action + ' at ' + createdAt}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[notificationStyles.rightUserSectionContent]}
                        onPress={() => dismissHandler(objectId)}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            style={notificationStyles.text}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
    );
}