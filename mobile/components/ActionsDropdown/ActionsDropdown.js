import { TouchableOpacity, Text, View, } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons/faPeopleArrowsLeftRight';
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";

export default function ActionsDropdown() {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            <TouchableOpacity style={actionsDropdownStyles.action}>
                <FontAwesomeIcon style={[actionsDropdownStyles.text, actionsDropdownStyles.icons]} icon={faTrashCan} />
                <Text style={actionsDropdownStyles.text}>Delete user</Text>
            </TouchableOpacity>
            <TouchableOpacity style={actionsDropdownStyles.action}>
                <FontAwesomeIcon style={[actionsDropdownStyles.text, actionsDropdownStyles.icons]} icon={faPenToSquare} />
                <Text style={actionsDropdownStyles.text}>Edit user</Text>
            </TouchableOpacity>
            <TouchableOpacity style={actionsDropdownStyles.action}>
                <FontAwesomeIcon style={[actionsDropdownStyles.text, actionsDropdownStyles.icons]} icon={faBan} />
                <Text style={actionsDropdownStyles.text}>Block user</Text>
            </TouchableOpacity>
            <TouchableOpacity style={actionsDropdownStyles.action}>
                <FontAwesomeIcon style={[actionsDropdownStyles.text, actionsDropdownStyles.icons]} icon={faPeopleArrowsLeftRight} />
                <Text style={actionsDropdownStyles.text}>Change role</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}