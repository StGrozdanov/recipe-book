import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { loadingScreenStyles } from './LoadingScreenStyleSheet';

export default function LoadingScreen() {
    const { userIsAuthenticated } = useAuthContext();
    const navigation = useNavigation();

    useEffect(() => {
        userIsAuthenticated()
            .then(isAuthenticated => {
                if (isAuthenticated == true) {
                    setTimeout(() => {
                        navigation.navigate('Dashboard');
                    }, 5000);
                } else {
                    setTimeout(() => {
                        navigation.navigate('Login');
                    }, 5000);
                }
            })
    }, []);

    return (
        <View style={loadingScreenStyles.container}>
            <ImageBackground
                source={require('../../assets/gradient.jpg')}
                resizeMode='cover'
                style={loadingScreenStyles.background}
            >
                <Text style={loadingScreenStyles.heading} >Recepies administrate</Text>
                <Image
                    source={require('../../assets/cooking.png')}
                    style={loadingScreenStyles.logo}
                />
                <Image
                    source={require('../../assets/admin-panel-loading.gif')}
                    style={loadingScreenStyles.loadingSpinner}
                />
            </ImageBackground>
        </View>
    );
}