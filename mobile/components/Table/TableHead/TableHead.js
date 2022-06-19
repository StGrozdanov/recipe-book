import { TouchableOpacity, View, Image, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { tableHeadStyles } from "./TableHeadStyleSheet";

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
    return (
        <TouchableOpacity onPress={toggleHandler}>
            <View
                style={[
                    tableHeadStyles.section,
                    isEven && tableHeadStyles.evenItem,
                    isFirst && tableHeadStyles.firstItem,
                    isLast && tableHeadStyles.lastItem,
                ]}
            >
                <FontAwesomeIcon
                    icon={isToggled ? faAngleDown : faAngleRight}
                    style={[tableHeadStyles.icon, isEven ? tableHeadStyles.whiteText : tableHeadStyles.iconText]}
                    size={17.5}
                />
                <View style={tableHeadStyles.leftUserSectionContent}>
                    <Image
                        style={tableHeadStyles.avatar}
                        source={
                            pictureType && !pictureSource
                                ? pictureType == 'avatar'
                                    ? require('../../../assets/avatar.png')
                                    : require('../../../assets/food.jpg')
                                : pictureSource
                        }
                    />
                    <Text style={[isEven && tableHeadStyles.whiteText, tableHeadStyles.text]}>{contentName}</Text>
                </View>
                <TouchableOpacity style={[tableHeadStyles.rightUserSectionContent]} onPress={optionsHandler}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        style={[isEven ? tableHeadStyles.whiteText : tableHeadStyles.iconText]}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}