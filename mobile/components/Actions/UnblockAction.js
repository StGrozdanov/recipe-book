import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { unblockUser } from "../../services/userService";

export default function UnblockAction({ collection, userId, setDropdownIsExpanded }) {    
    async function unblockUserHandler() {
        await unblockUser(userId);
        setDropdownIsExpanded(false);
    }
    return (
        <>
            <TouchableOpacity style={actionStyles.action} onPress={unblockUserHandler}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faBan} />
                <Text style={actionStyles.text}>Unblock {collection}</Text>
            </TouchableOpacity>
        </>
    );
}