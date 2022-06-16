import { View, Text, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons/faFileCirclePlus";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faComments } from "@fortawesome/free-solid-svg-icons/faComments";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { statsCardStyles } from "./StatsCardStyleSheet";

const cardIcons = {
    ПУБЛИКАЦИИ: faFileCirclePlus,
    ПОТРЕБИТЕЛИ: faUsers,
    КОМЕНТАРИ: faComments,
    ПОСЕЩЕНИЯТАДНЕС: faEye,
}

const cardIconsStyles = {
    ПУБЛИКАЦИИ: statsCardStyles.publications,
    ПОТРЕБИТЕЛИ: statsCardStyles.users,
    КОМЕНТАРИ: statsCardStyles.comments,
    ПОСЕЩЕНИЯТАДНЕС: statsCardStyles.visitations,
}

export default function StatsCard({ text, value }) {
    let iconKey = text.replace(' ', '')

    return (
            <View style={statsCardStyles.card}>
                <View style={[statsCardStyles.iconContainer, cardIconsStyles[iconKey]]}>
                    <FontAwesomeIcon
                        style={[statsCardStyles.icons, cardIconsStyles[iconKey]]}
                        size={13}
                        icon={cardIcons[iconKey]}
                    />
                </View>
                <Text style={[statsCardStyles.textContent, statsCardStyles.cardHeading]}>{text}</Text>
                <Text style={statsCardStyles.textContent}>{value}</Text>
                <ImageBackground style={statsCardStyles.afterElement} />
            </View>
    );
}