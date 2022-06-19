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
    approveAction
}) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            {deleteAction && <DeleteAction collection={deleteAction} />}
            {editAction && <EditAction collection={editAction} />}
            {changeRoleAction && <ChangeRoleAction collection={changeRoleAction} />}
            {blockAction && <BlockAction collection={blockAction} />}
            {removeAction && <RemoveAction collection={removeAction} />}
            {approveAction && <ApproveAction collection={approveAction} />}
        </TouchableOpacity>
    );
}