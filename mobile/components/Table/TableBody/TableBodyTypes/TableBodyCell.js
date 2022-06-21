import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../contexts/ThemeContext";

const VALID_CELLS = [
    'Email',
    'Avatar',
    'Cover',
    'Status',
    'Role',
]

export default function Cell({ heading, data }) {
    const { theme } = useThemeContext();
    if (VALID_CELLS.includes(heading) === false) {
        return null;
    }

    return (
        <>
            <View>
                <Text style={tableBodyStyles[theme + 'AdditionalDataHeading']}>{heading}</Text>
                <Text style={tableBodyStyles[theme + 'AdditionalDataContent']}>{data}</Text>
            </View>
        </>
    );
}