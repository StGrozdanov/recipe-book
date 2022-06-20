import { View, Text, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { statsCardStyles } from "./StatsCardStyleSheet";
import { CARD_ICONS } from "../../constants/statsCardsIcons";
import { useThemeContext } from "../../contexts/ThemeContext";

const cardIconsStyles = {
    ПУБЛИКАЦИИ: statsCardStyles.publications,
    ПОТРЕБИТЕЛИ: statsCardStyles.users,
    КОМЕНТАРИ: statsCardStyles.comments,
    ПОСЕЩЕНИЯТАДНЕС: statsCardStyles.visitations,
}

export default function StatsCard({ text, value }) {
    let iconKey = text.replace(' ', '')
    const { theme } = useThemeContext();

    return (
            <View style={statsCardStyles[theme + 'Card']}>
                <View style={[statsCardStyles.iconContainer, cardIconsStyles[iconKey]]}>
                    <FontAwesomeIcon
                        style={[statsCardStyles.icons, cardIconsStyles[iconKey]]}
                        size={13}
                        icon={CARD_ICONS[iconKey]}
                    />
                </View>
                <Text style={[statsCardStyles[theme + 'TextContent'], statsCardStyles.cardHeading]}>{text}</Text>
                <Text style={statsCardStyles[theme + 'TextContent']}>{value}</Text>
                <ImageBackground style={statsCardStyles[theme + 'AfterElement']} />
            </View>
    );
}