import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { summary } from "../../../../helpers/contentSummary";

const VALID_CELLS = [
    'Email',
    'Avatar',
    'Cover',
    'Status',
    'Role',
]

const SUMMARIZED_CELLS = [
    'Email',
    'Avatar',
    'Cover'
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
                <Text style={tableBodyStyles[theme + 'AdditionalDataContent']}>
                    { SUMMARIZED_CELLS.includes(heading) ? summary(data, 3) : data }
                </Text>
            </View>
        </>
    );
}