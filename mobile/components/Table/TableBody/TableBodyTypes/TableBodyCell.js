import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../contexts/ThemeContext";

export default function Cell({ heading, data }) {
    const { theme } = useThemeContext();

    return (
        <>
            <View>
                <Text style={tableBodyStyles[theme + 'AdditionalDataHeading']}>{heading}</Text>
                <Text style={tableBodyStyles[theme + 'AdditionalDataContent']}>{data}</Text>
            </View>
        </>
    );
}