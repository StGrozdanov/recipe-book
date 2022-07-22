import { Text, View, TouchableOpacity } from "react-native";
import { useThemeContext } from "../../hooks/useThemeContext";
import { modalStyles } from "./ModalDialogueStyleSheet";
import RadioButton from "../RadioButton/RadioButton";
import ModalDialogue from "./ModalDialogue";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { appearanceStyles } from '../Appearance/AppearanceStyleSheet';

export default function OptionsModal({ visible, selectedOption, message, setVisible, options, triggerFunction }) {
    const { theme } = useThemeContext();

    return (
        <ModalDialogue visible={visible} >
            <TouchableOpacity style={modalStyles.xMark} onPress={() => setVisible(false)}>
                <FontAwesomeIcon icon={faXmark} size={17} color={'rgba(124,113,192,1)'} />
            </TouchableOpacity>
            <Text style={modalStyles[theme + 'Message']}>{message}</Text>
            <View style={modalStyles.optionsContainer}>
                {
                    options.map(option => {
                        return (
                            <TouchableOpacity
                                style={appearanceStyles.container}
                                onPress={() => {
                                    triggerFunction.setCurrentRole(option);
                                    triggerFunction.setRoleChangeRequest(true);
                                }}
                                key={option + option}
                            >
                                <RadioButton
                                    selected={selectedOption == option ? selectedOption : false}
                                    text={option}
                                    key={option}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ModalDialogue>
    );
}