import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { loginStyles } from "./LoginStyleSheet";
import LoginInput from "./LoginInput";

export default function Login({ navigation }) {
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
                <View style={loginStyles.formWrapper}>
                    <LoginInput placeHolder='Username' />
                    <LoginInput placeHolder='Password' />
                    <TouchableOpacity style={loginStyles.button} onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    );
}