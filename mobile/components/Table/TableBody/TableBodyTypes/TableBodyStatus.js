import { View, Text } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";

export default function Status({ status }) {
    return (
        <View>
            <Text style={[tableBodyStyles.additionalDataHeading]}>Status</Text>
            <Text
                style={[
                    tableBodyStyles.additionalDataContent, 
                    tableBodyStyles.status,
                    tableBodyStyles[status]
                ]}
            >
                {status}
            </Text>
        </View>
    );
}