import { TouchableOpacity, View, Image, Text } from 'react-native';
import { userStyles } from './UserStyleSheet';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons/faEllipsis';
import { useState } from 'react';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';

export default function User({ username, isEven, isFirst, isLast, email, avatar, coverPhoto, status }) {
    const [isToggled, setIsToggled] = useState(false);
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);

    function toggleHandler() {
        if (isToggled) {
            setIsToggled(false);
            setDropdownIsExpanded(false);
        } else {
            setIsToggled(true);
        }
    }

    function optionsHandler() {
        if (dropdownIsExpanded) {
            setDropdownIsExpanded(false);
        } else {
            setDropdownIsExpanded(true);
            setIsToggled(true);
        }
    }

    return (
        <>
            <TouchableOpacity onPress={toggleHandler}>
                <View
                    style={[
                        userStyles.userSection,
                        isEven && userStyles.evenItem,
                        isFirst && userStyles.firstItem,
                        isLast && userStyles.lastItem,
                    ]}
                >
                    <FontAwesomeIcon
                        icon={isToggled ? faAngleDown : faAngleRight}
                        style={[userStyles.icon, isEven ? userStyles.whiteText : userStyles.iconText]}
                        size={17.5}
                    />
                    <View style={userStyles.leftUserSectionContent}>
                        <Image style={userStyles.avatar} source={require('../../assets/Avatar.png')} />
                        <Text style={[isEven && userStyles.whiteText, userStyles.text]}>{username}</Text>
                    </View>
                    <TouchableOpacity style={[userStyles.rightUserSectionContent]} onPress={optionsHandler}>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            style={[isEven ? userStyles.whiteText : userStyles.iconText]}
                            size={20}
                        />
                    </TouchableOpacity>
                    {dropdownIsExpanded && <ActionsDropdown />}
                </View>
            </TouchableOpacity>
            <View style={[userStyles.additionalData, !isToggled && userStyles.toggledData]}>
                <View>
                    <Text style={userStyles.additionalDataHeading}>Email</Text>
                    <Text style={userStyles.additionalDataContent}>{email}</Text>
                </View>
                <View>
                    <Text style={userStyles.additionalDataHeading}>Avatar</Text>
                    <Text style={userStyles.additionalDataContent}>{avatar}</Text>
                </View>
                <View>
                    <Text style={userStyles.additionalDataHeading}>Cover</Text>
                    <Text style={userStyles.additionalDataContent}>{coverPhoto}</Text>
                </View>
                <View>
                    <Text style={userStyles.additionalDataHeading}>Status</Text>
                    <Text
                        style={[userStyles.additionalDataContent, userStyles[status]]}
                    >
                        {status}
                    </Text>
                </View>
            </View>
        </>
    );
}