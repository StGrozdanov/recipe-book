import { TouchableOpacity, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { tableHeadStyles } from "./TableHeadStyleSheet";
import { useThemeContext } from "../../../hooks/useThemeContext";

export default function TableHead({
    isEven,
    isFirst,
    isLast,
    contentName,
    pictureSource,
    pictureType,
    toggleHandler,
    optionsHandler,
    isToggled
}) {
    const { theme } = useThemeContext();

    return (
        <TouchableOpacity onPress={toggleHandler}>
            <View
                style={[
                    tableHeadStyles[theme + 'Section'],
                    isEven && tableHeadStyles[theme + 'EvenItem'],
                    isFirst && tableHeadStyles[theme + 'FirstItem'],
                    isLast && tableHeadStyles[theme + 'LastItem'],
                ]}
            >
                <FontAwesomeIcon
                    icon={isToggled ? faAngleDown : faAngleRight}
                    style={[tableHeadStyles.icon, isEven ? tableHeadStyles[theme + 'WhiteText'] : tableHeadStyles.iconText]}
                    size={17.5}
                />
                <View style={tableHeadStyles.leftUserSectionContent}>
                    {
                        pictureSource
                            ? <Image
                                source={{ uri: pictureSource }}
                                style={tableHeadStyles[theme + 'Avatar']}
                            />
                            : <Image
                                style={tableHeadStyles[theme + 'Avatar']}
                                source={
                                    pictureType == 'avatar'
                                        ? require('../../../assets/avatar.png')
                                        : require('../../../assets/food.jpg')
                                }
                            />
                    }
                    <Text style={[isEven && tableHeadStyles[theme + 'WhiteText'], tableHeadStyles.text]}>{contentName}</Text>
                </View>
                <TouchableOpacity style={[tableHeadStyles.rightUserSectionContent]} onPress={optionsHandler}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        style={[isEven ? tableHeadStyles[theme + 'WhiteText'] : tableHeadStyles.iconText]}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}