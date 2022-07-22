import { FlatList, RefreshControl } from "react-native";
import { notificationStyles } from "./NotificationsStyleSheet";
import { useCallback, useEffect, useState } from "react";
import { getMyNotifications } from "../../services/notificationService";
import NotificationCard from './NotificationCard';

export default function Notifications() {
    const [refreshData, setRefreshData] = useState(false);
    const [notificationData, setNotificationData] = useState([]);

    useEffect(() => {
        getMyNotifications()
        .then(res => {
            setNotificationData(res);
        })
        .catch(error => console.log(error.message));
    }, [refreshData]);

    const onRefresh = useCallback(() => {
        setRefreshData(true);
        getMyNotifications()
        .then(res => {
            setNotificationData(res);
        })
        .then(setRefreshData(false))
        .catch(error => console.log(error.message));
    }, []);

    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshData} onRefresh={onRefresh} />}
            style={notificationStyles.container}
            keyExtractor={item => item.id}
            data={notificationData}
            renderItem={({ item }) => (
                <NotificationCard
                    action={item.action}
                    createdAt={item.createdAt}
                    locationId={item.locationId}
                    objectId={item.id}
                    senderAvatar={item.senderAvatar}
                    senderName={item.senderUsername}
                />
            )}
        />
    );
}