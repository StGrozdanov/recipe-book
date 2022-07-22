import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { remove } from "../../services/userService";
import { useState } from "react";
import ConfirmModal from "../ModalDialogue/ConfirmModal";
import { removeRecipe } from "../../services/recipeService";

const deleteMessages = {
    userModalMessage: 'Сигурни ли сте, че искате да изтриете този потребител?',
    recipeModalMessage: 'Сигурни ли сте, че искате да изтриете тази рецепта?',
}

export default function DeleteAction({ collection, objectId, removeUser, removeRecipe: deleteFromTable }) {
    const [showModal, setShowModal] = useState(false);

    async function userDeleteHandler() {
        setShowModal(true);
        await remove(objectId);
        removeUser(objectId);
    }

    async function recipeDeleteHandler() {
        setShowModal(true);
        await removeRecipe(objectId);
        deleteFromTable(objectId);
    }

    const deleteHandlers = {
        user: userDeleteHandler,
        recipe: recipeDeleteHandler,
    }    

    return (
        <>
            <ConfirmModal 
                visible={showModal} 
                message={deleteMessages[collection + 'ModalMessage']} 
                triggerFunction={deleteHandlers[collection]} 
                setVisible={setShowModal} 
            />
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
                <Text style={actionStyles.text}>Delete {collection}</Text>
            </TouchableOpacity>
        </>
    );
}