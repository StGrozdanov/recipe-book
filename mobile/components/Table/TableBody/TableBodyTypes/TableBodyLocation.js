import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { useThemeContext } from "../../../../contexts/ThemeContext";

export default function Location({ pointer }) {
    const { theme } = useThemeContext();

    //on press -> redirect pointer.
    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Location</Text>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faLocationArrow} style={tableBodyStyles[theme + 'Icons']} size={18} />
            </TouchableOpacity>
        </View>
    );
}