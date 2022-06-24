import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons/faShareFromSquare";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function Owner({ pointer }) {
    const { theme } = useThemeContext();
    const navigator = useNavigation();

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Owner</Text>
            <TouchableOpacity onPress={() => navigator.navigate('Users', { itemId: pointer })}>
                <FontAwesomeIcon icon={faShareFromSquare} style={tableBodyStyles[theme + 'Icons']} size={20} />
            </TouchableOpacity>
        </View>
    );
}