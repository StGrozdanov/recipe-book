import { useState } from "react";
import { View, TouchableOpacity } from "react-native"
import RadioButton from "../RadioButton/RadioButton"
import { settingsStyles } from "../Settings/SettingsStyleSheet";

export default function Appearance() {
    const [selectedRemember, setSelectedRemember] = useState(true);
    const [selectedSystem, setSelectedSystem] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);

    function selectRememberHandler() {
        clearAllOptions();
        setSelectedRemember(true);
    }

    function selectSystemHandler() {
        clearAllOptions();
        setSelectedSystem(true);
    }

    function selectTimeHandler() {
        clearAllOptions();
        setSelectedTime(true);
    }

    function clearAllOptions() {
        setSelectedRemember(false);
        setSelectedSystem(false);
        setSelectedTime(false);
    }

    return (
        <View>
            <TouchableOpacity onPress={selectRememberHandler} style={settingsStyles.touchable}>
                <RadioButton selected={selectedRemember} text={"Remember my last theme choice"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectSystemHandler} style={settingsStyles.touchable}>
                <RadioButton selected={selectedSystem} text={"Adjust depending on system settings"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectTimeHandler} style={settingsStyles.touchable}>
                <RadioButton selected={selectedTime} text={"Select timestamps"} />
            </TouchableOpacity>
        </View>
    )
}

