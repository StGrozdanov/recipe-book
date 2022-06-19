import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';

export default function RemoveAction({ collection }) {
    return (
        <TouchableOpacity style={actionStyles.action}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
            <Text style={actionStyles.text}>Remove {collection}</Text>
        </TouchableOpacity>
    );
}