import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { remove } from "../../services/userService";
import { useState } from "react";
import ConfirmModal from "../ModalDialogue/ConfirmModal";

const modalMessage = 'Сигурни ли сте, че искате да изтриете този потребител?';

export default function DeleteAction({ collection, objectId, removeUser }) {
    const [showModal, setShowModal] = useState(false);

    async function deleteUserHandler() {
        setShowModal(true);
        await remove(objectId);
        removeUser(objectId);
    }

    return (
        <>
            <ConfirmModal 
                visible={showModal} 
                message={modalMessage} 
                triggerFunction={deleteUserHandler} 
                setVisible={setShowModal} 
            />
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
                <Text style={actionStyles.text}>Delete {collection}</Text>
            </TouchableOpacity>
        </>
    );
}