import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { loginStyles } from "./LoginStyleSheet";
import LoginInput from "./LoginInput";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from "react";
import * as userService from "../../services/userService";

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidInput, setInvalidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login, userIsAuthenticated } = useAuthContext();

    TODO: 'loading spinners'

    useEffect(() => {
        if (userIsAuthenticated()) {
            navigation.navigate('Dashboard');
        }
    }, []);

    function LoginHandler() {
        if (username.trim() === '' || password.trim() === '') {
            indicateLoginError('All fields are required.')
            return;
        }

        setInvalidInput(false);
        setErrorMessage('');

        userService.login({ username, password })
            .then(authData => {
                if (authData.username === 'shushan' || authData.username === 'ani') {
                    login(authData)
                        .then(navigation.navigate('Dashboard'));
                } else {
                    indicateLoginError('You don\'t have a permission to use this app.');
                }
            })
            .catch(err => {
                indicateLoginError(err.message);
            });
    }

    function indicateLoginError(message) {
        setInvalidInput(true);
        setErrorMessage(message);
    }

    return (
        <View style={loginStyles.container}>
            <ImageBackground
                source={require('../../assets/gradient.jpg')}
                resizeMode='cover'
                style={loginStyles.background}
            >
                <Text style={loginStyles.heading}>Login.</Text>
                <Text style={loginStyles.secondHeading}>Welcome Back,</Text>
                <Text style={loginStyles.thirdHeading}>Sign in to continue</Text>
                <Text style={loginStyles.errorHeading}>{errorMessage}</Text>
                <View style={loginStyles.formWrapper}>
                    <LoginInput placeHolder='Username' setFieldValue={setUsername} invalidInput={invalidInput} />
                    <LoginInput placeHolder='Password' setFieldValue={setPassword} invalidInput={invalidInput} />
                    <TouchableOpacity style={loginStyles.button} onPress={LoginHandler}>
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );
}