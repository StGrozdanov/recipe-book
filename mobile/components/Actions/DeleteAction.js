import { TouchableOpacity, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { remove } from "../../services/userService";
import ModalDialogue from "../ModalDialogue/ModalDialogue";
import { useState } from "react";


export default function DeleteAction({ collection, objectId, removeUser }) {
    const [showModal, setShowModal] = useState(false);

    async function deleteUserHandler() {
        setShowModal(true);
        await remove(objectId);
        removeUser(objectId);
    }

    return (
        <>
            <ModalDialogue visible={showModal} >
                <Text style={{ textAlign: 'center', }}>Сигурни ли сте, че искате да изтриете потребителя?</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 40 }}>
                    <TouchableOpacity 
                        style={{ borderRadius: 25, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'green'}}
                        onPress={deleteUserHandler}    
                    >
                        <Text style={{color: 'white'}}>Потвърди</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ borderRadius: 25, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'red'}}
                        onPress={() => setShowModal(false)}
                    >
                        <Text style={{color: 'white'}}>Отхвърли</Text>
                    </TouchableOpacity>
                </View>
            </ModalDialogue>
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faTrashCan} />
                <Text style={actionStyles.text}>Delete {collection}</Text>
            </TouchableOpacity>
        </>
    );
}