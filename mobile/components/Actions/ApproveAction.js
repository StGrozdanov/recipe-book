import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons/faFileCircleCheck';
import { approveRecipe } from "../../services/recipeService";

export default function ApproveAction({ collection, recipeId, setDropdownIsExpanded }) {
    async function approveRecipeHandler() {
        await approveRecipe(recipeId);
        setDropdownIsExpanded(false);
    }
    return (
        <TouchableOpacity style={actionStyles.action} onPress={approveRecipeHandler}>
            <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faFileCircleCheck} />
            <Text style={actionStyles.text}>Approve {collection}</Text>
        </TouchableOpacity>
    );
}