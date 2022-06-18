import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';

export default function BlockAction({ collection }) {
    return (
        <TouchableOpacity style={actionStyles.action}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faBan} />
            <Text style={actionStyles.text}>Block {collection}</Text>
        </TouchableOpacity>
    );
}