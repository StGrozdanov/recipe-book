import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { useOuterURL } from "../../../../hooks/useOuterURL";

export default function Location({ pointer }) {
    const { theme } = useThemeContext();

    async function redirectHandler() {
        await useOuterURL(`https://recepti-na-shushanite.web.app/details-${pointer}`);
    }

    return (
        <View>
            <Text style={[tableBodyStyles[theme + 'AdditionalDataHeading']]}>Location</Text>
            <TouchableOpacity onPress={redirectHandler}>
                <FontAwesomeIcon icon={faLocationArrow} style={tableBodyStyles[theme + 'Icons']} size={18} />
            </TouchableOpacity>
        </View>
    );
}