import { Text, View, TouchableOpacity } from "react-native";
import ModalDialogue from "./ModalDialogue";
import { modalStyles } from "./ModalDialogueStyleSheet";

export default function ConfirmModal({ visible, message, triggerFunction, setVisible }) {
    return (
        <ModalDialogue visible={visible} >
            <Text style={modalStyles.message}>{message}</Text>
            <View style={modalStyles.buttonsContainer}>
                <TouchableOpacity style={modalStyles.confirmButton} onPress={triggerFunction}>
                    <Text style={modalStyles.buttonText}>Потвърди</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modalStyles.cancelButton} onPress={() => setVisible(false)}>
                    <Text style={modalStyles.buttonText}>Отхвърли</Text>
                </TouchableOpacity>
            </View>
        </ModalDialogue>
    );
}