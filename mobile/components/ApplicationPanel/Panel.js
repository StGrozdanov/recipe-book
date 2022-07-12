import { View } from "react-native";
import { adminPanel } from "./PanelStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import socket from "../../services/socketioService";
import * as notificationService from "../../services/notificationService";
import * as Device from 'expo-device';

export default function Panel({ navigation, content }) {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();
    const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
        notificationService
            .getMyNotifications(user.objectId)
            .then(notifications => {
                unreadNotificationsCount = notifications.length;
                setNotificationsCount(unreadNotificationsCount);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        socket.emit("newUser", user.objectId);
    }, [user]);

    socket.on('receiveNotification', data => {
        let newCount = notificationsCount + 1;
        setNotificationsCount(newCount);
    });

    function markNotificationsAsSeen() {
        setNotificationsCount(0);
    }

    const androidNavAndStatusBarColors = theme == 'light' ? 'dark' : 'light';

    if (Device.brand !== 'Apple') {
        const androidNavBarBackground = theme == 'light' ? '#EFEEFE' : 'black';
        NavigationBar.setBackgroundColorAsync(androidNavBarBackground);
        NavigationBar.setButtonStyleAsync(androidNavAndStatusBarColors);
    }

    return (
        <>
            <StatusBar
                backgroundColor={theme == 'light' ? "#EFEEFE" : "rgba(124,113,192,0.9)"}
                style={androidNavAndStatusBarColors}
            />
            <View style={adminPanel[theme + 'Container']}>
                <Header
                    notificationsCount={notificationsCount}
                    navigation={navigation}
                    markNotificationsAsSeen={markNotificationsAsSeen}
                />
                {content}
                <Navigation />
            </View>
        </>
    );
}