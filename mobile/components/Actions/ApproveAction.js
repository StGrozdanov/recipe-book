import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons/faFileCircleCheck';

export default function ApproveAction({ collection }) {
    return (
        <TouchableOpacity style={actionStyles.action}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faFileCircleCheck} />
            <Text style={actionStyles.text}>Approve {collection}</Text>
        </TouchableOpacity>
    );
}