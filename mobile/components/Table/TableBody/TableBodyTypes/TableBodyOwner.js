import { View, Text, TouchableOpacity } from "react-native";
import { tableBodyStyles } from "../TableBodyStyleSheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons/faShareFromSquare";

export default function Owner({ pointer }) {
    //on press -> redirect pointer.
    return (
        <View>
            <Text style={[tableBodyStyles.additionalDataHeading]}>Owner</Text>
            <TouchableOpacity>
                <FontAwesomeIcon icon={faShareFromSquare} style={tableBodyStyles.icons} size={20} />
            </TouchableOpacity>
        </View>
    );
}