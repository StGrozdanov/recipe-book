import { TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { actionStyles } from "./ActionsStyleSheet";
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons/faPeopleArrowsLeftRight';
import OptionsModal from "../ModalDialogue/OptionsModal";
import { useEffect, useState } from "react";
import { changeUserRole } from "../../services/userService";

const changeRoleMessage = 'Изберете роля за потребителя'
const roleChoices = ['Администратор', 'Модератор', 'Потребител'];

export default function ChangeRoleAction({ userRole, userId }) {
    const [showModal, setShowModal] = useState(false);
    const [currentRole, setCurrentRole] = useState(userRole);
    const [roleChangeRequest, setRoleChangeRequest] = useState(false);

    useEffect(() => {
        if (roleChangeRequest) {
            changeUserRole(userId, currentRole)
            .then(console.log(`Role change success user ${userId} is now ${currentRole}`))
            .catch(err => console.log(err.message));
        }
    }, [currentRole])

    return (
        <>
            <OptionsModal
                message={changeRoleMessage}
                options={roleChoices}
                selectedOption={currentRole}
                setVisible={setShowModal}
                visible={showModal}
                triggerFunction={{setCurrentRole, setRoleChangeRequest}}
            />
            <TouchableOpacity style={actionStyles.action} onPress={() => setShowModal(true)}>
                <FontAwesomeIcon style={[actionStyles.text, actionStyles.icons]} icon={faPeopleArrowsLeftRight} />
                <Text style={actionStyles.text}>Change user role</Text>
            </TouchableOpacity>
        </>
    );
}