import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons/faShareFromSquare";
import { useThemeContext } from "../../../../hooks/useThemeContext";

export default function Owner({ pointer }) {
    const { theme } = useThemeContext();
    //on press -> redirect pointer.
    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Owner</Text>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faShareFromSquare} style={tableBodyStyles[theme + 'Icons']} size={20} />
            </TouchableOpacity>
        </View>
    );
}