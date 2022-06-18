import { TouchableOpacity } from "react-native";
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";
import DeleteAction from '../Actions/DeleteAction'
import EditAction from '../Actions/EditAction'
import ChangeRoleAction from '../Actions/ChangeRoleAction'
import BlockAction from '../Actions/BlockAction'

export default function ActionsDropdown({ blockAction, editAction, deleteAction, changeRoleAction }) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            { deleteAction && <DeleteAction collection={deleteAction} /> }
            { editAction && <EditAction collection={editAction} /> }
            { changeRoleAction && <ChangeRoleAction collection={changeRoleAction} /> }
            { blockAction && <BlockAction collection={blockAction} /> }
        </TouchableOpacity>
    );
}