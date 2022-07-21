import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { useNavigation } from "@react-navigation/native";

export default function EditAction({ collection, objectId, setDropdownIsExpanded }) {
    const navigator = useNavigation();

    function navigateHandler() {
        setDropdownIsExpanded(false);
        navigator.navigate('Profile', { itemId: objectId });
    }

    return (
        <TouchableOpacity style={actionStyles.action} onPress={navigateHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPenToSquare} />
            <Text style={actionStyles.text}>Edit {collection}</Text>
        </TouchableOpacity>
    );
}