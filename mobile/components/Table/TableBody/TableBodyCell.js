import { View, Text } from "react-native";
import { tableBodyStyles } from "./TableBodyStyleSheet";

export default function Cell({ heading, data }) {
    return (
        <>
            <View>
                <Text style={tableBodyStyles.additionalDataHeading}>{heading}</Text>
                <Text style={tableBodyStyles.additionalDataContent}>{data}</Text>
            </View>
        </>
    );
}