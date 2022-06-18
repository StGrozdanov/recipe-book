import { useState } from 'react';
import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';
import TableHead from '../Table/TableHead/TableHead'
import TableBody from '../Table/TableBody/TableBody';

export default function User({ isEven, isFirst, isLast, name, data }) {
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
            <TableHead
                contentName={name}
                isEven={isEven}
                isFirst={isFirst}
                isLast={isLast}
                isToggled={isToggled}
                optionsHandler={optionsHandler}
                toggleHandler={toggleHandler}
            />
            {dropdownIsExpanded &&
                <ActionsDropdown
                    deleteAction={'user'}
                    editAction={'user'}
                    blockAction={'user'}
                    changeRoleAction={true}
                />
            }
            <TableBody isToggled={isToggled} data={data} />
        </>
    );
}