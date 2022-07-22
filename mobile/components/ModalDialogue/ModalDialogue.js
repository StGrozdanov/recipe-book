import { Modal, View } from "react-native";
import { modalStyles } from './ModalDialogueStyleSheet';

export default function ModalDialogue({ visible, children }) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent
        >
            <View style={modalStyles.modalBackground}>
                <View style={modalStyles.modalContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};