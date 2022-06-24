import { View, Text } from "react-native";
import { radioButtonStyles } from "./RadioButtonStyleSheet";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function RadioButton({ text, selected }) {
    const { theme } = useThemeContext();

    return (
        <View style={radioButtonStyles.container}>
            <View style={radioButtonStyles[theme + 'Wrapper']}>
                {
                    selected &&
                    <View style={radioButtonStyles.selected} />
                }
            </View>
            <Text style={radioButtonStyles[theme + 'Text']}>{text}</Text>
        </View>
    );
}