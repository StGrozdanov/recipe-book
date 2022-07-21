import { View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { loginStyles } from "./LoginStyleSheet";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from "react";
import LoginInput from "./LoginInput";
import { login as attendLogin } from '../../services/authenticationService'

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidInput, setInvalidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthContext();

    function LoginHandler() {
        if (username.trim() === '' || password.trim() === '') {
            indicateLoginError('All fields are required.')
            return;
        }

        setInvalidInput(false);
        setErrorMessage('');
        setIsLoading(true);

        attendLogin({ username, password })
            .then(authData => {
                if (Boolean(authData.administrator)) {
                    login(authData)
                        .then(setIsLoading(false))
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
        setIsLoading(false);
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
                {isLoading &&
                    <Image source={require('../../assets/admin-panel-loading.gif')} style={loginStyles.loadingSpinner} />
                }
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