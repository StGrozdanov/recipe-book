import { useEffect, useState } from 'react';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import TableHead from '../Table/TableHead/TableHead'
import TableBody from '../Table/TableBody/TableBody';
import { useRoute } from '@react-navigation/native';

export default function Table({
    isEven,
    isFirst,
    isLast,
    name,
    data,
    pictureType,
    pictureSource,
    deleteAction,
    editAction,
    blockAction,
    approveAction,
    changeRoleAction,
    removeUser,
    removeRecipe,
    removeComment,
}) {
    const route = useRoute();
    const [isToggled, setIsToggled] = useState(false);
    const [dropdownIsExpanded, setDropdownIsExpanded] = useState(false);

    useEffect(() => {
        setIsToggled(route.params.itemId == data.id);
    }, [route.params]);

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
            <TableHead
                pictureSource={pictureSource}
                pictureType={pictureType}
                contentName={name}
                isEven={isEven}
                isFirst={isFirst}
                isLast={isLast}
                isToggled={isToggled}
                optionsHandler={optionsHandler}
                toggleHandler={toggleHandler}
            />
            <TableBody isToggled={isToggled} data={data} />
            {
            dropdownIsExpanded &&
                <ActionsDropdown
                    deleteAction={deleteAction}
                    editAction={editAction}
                    blockAction={blockAction}
                    approveAction={approveAction}
                    changeRoleAction={changeRoleAction}
                    objectId={data.id}
                    userRole={data.primaryRole}
                    removeUser={removeUser}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    userIsBlocked={data.blocked}
                    removeRecipe={removeRecipe}
                    removeComment={removeComment}
                />
            }
        </>
    );
}