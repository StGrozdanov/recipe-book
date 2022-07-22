import { Modal, View } from "react-native";
import { useThemeContext } from "../../hooks/useThemeContext";
import { modalStyles } from './ModalDialogueStyleSheet';

export default function ModalDialogue({ visible, children }) {
    const { theme } = useThemeContext();

    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent
        >
            <View style={modalStyles.modalBackground}>
                <View style={modalStyles[theme + 'ModalContainer']}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};