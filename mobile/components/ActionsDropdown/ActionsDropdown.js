import { TouchableOpacity } from "react-native";
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";
import DeleteAction from '../Actions/DeleteAction'
import EditAction from '../Actions/EditAction'
import ChangeRoleAction from '../Actions/ChangeRoleAction'
import BlockAction from '../Actions/BlockAction'
import RemoveAction from '../Actions/RemoveAction'
import ApproveAction from '../Actions/ApproveAction'
import UnblockAction from "../Actions/UnblockAction";

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
    userIsBlocked,
}) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            {deleteAction && <DeleteAction collection={deleteAction} objectId={objectId} removeUser={removeUser} />}
            {editAction && <EditAction collection={editAction} objectId={objectId} setDropdownIsExpanded={setDropdownIsExpanded} />}
            {changeRoleAction && <ChangeRoleAction collection={changeRoleAction} userId={objectId} userRole={userRole} />}
            {blockAction && !userIsBlocked 
              ? <BlockAction collection={blockAction} userId={objectId} setDropdownIsExpanded={setDropdownIsExpanded} />
              : <UnblockAction collection={blockAction} userId={objectId} setDropdownIsExpanded={setDropdownIsExpanded} />}
            {removeAction && <RemoveAction collection={removeAction} objectId={objectId} removeUser={removeUser} />}
            {approveAction && <ApproveAction collection={approveAction} />}
        </TouchableOpacity>
    );
}