import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { remove } from "../../services/userService";

export default function RemoveAction({ collection, objectId, removeUser }) {
    async function deleteUserHandler() {
        console.log('here');
        await remove(objectId);
        removeUser(objectId);
    }

    return (
        <TouchableOpacity style={actionStyles.action} onPress={deleteUserHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
            <Text style={actionStyles.text}>Remove {collection}</Text>
        </TouchableOpacity>
    );
}