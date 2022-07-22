import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { useThemeContext } from "../../../../hooks/useThemeContext";

export default function Status({ status }) {
    const { theme } = useThemeContext();
    if (status == 'одобрена') {
        status = 'Approved';
    } else if (status == 'изчакваща') {
        status = 'Pending'
    }

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Status</Text>
            <Text
                style={[
                    tableBodyStyles[theme + 'AdditionalDataContent'], 
                    tableBodyStyles.status,
                    tableBodyStyles[status]
                ]}
            >
                {status}
            </Text>
        </View>
    );
}