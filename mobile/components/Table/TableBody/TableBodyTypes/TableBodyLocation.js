import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons/faLocationArrow";

export default function Location({ pointer }) {
    //on press -> redirect pointer.
    return (
        <View>
            <Text style={[tableBodyStyles.additionalDataHeading]}>Location</Text>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faLocationArrow} style={tableBodyStyles.icons} size={18} />
            </TouchableOpacity>
        </View>
    );
}