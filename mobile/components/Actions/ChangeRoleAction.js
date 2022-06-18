import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons/faPeopleArrowsLeftRight';

export default function ChangeRoleAction() {
    return (
        <TouchableOpacity style={actionStyles.action}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPeopleArrowsLeftRight} />
            <Text style={actionStyles.text}>Change user role</Text>
        </TouchableOpacity>
    );
}