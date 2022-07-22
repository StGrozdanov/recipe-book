import { TouchableOpacity } from "react-native";
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";
import DeleteAction from '../Actions/DeleteAction'
import EditAction from '../Actions/EditAction'
import ChangeRoleAction from '../Actions/ChangeRoleAction'
import BlockAction from '../Actions/BlockAction'
import RemoveAction from '../Actions/RemoveAction'
import ApproveAction from '../Actions/ApproveAction'

export default function ActionsDropdown({
    blockAction,
    editAction,
    deleteAction,
    changeRoleAction,
    removeAction,
    approveAction,
    objectId,
    removeUser,
    setDropdownIsExpanded,
    userRole,
}) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            {deleteAction && <DeleteAction collection={deleteAction} objectId={objectId} removeUser={removeUser} />}
            {editAction && <EditAction collection={editAction} objectId={objectId} setDropdownIsExpanded={setDropdownIsExpanded} />}
            {changeRoleAction && <ChangeRoleAction collection={changeRoleAction} userId={objectId} userRole={userRole} />}
            {blockAction && <BlockAction collection={blockAction} userId={objectId} />}
            {removeAction && <RemoveAction collection={removeAction} objectId={objectId} removeUser={removeUser} />}
            {approveAction && <ApproveAction collection={approveAction} />}
        </TouchableOpacity>
    );
}