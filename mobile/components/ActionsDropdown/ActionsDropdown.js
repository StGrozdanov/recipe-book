import { TouchableOpacity } from "react-native";
import { actionsDropdownStyles } from "./ActionsDropdownStyleSheet";
import DeleteAction from '../Actions/DeleteAction'
import EditAction from '../Actions/EditAction'
import ChangeRoleAction from '../Actions/ChangeRoleAction'
import BlockAction from '../Actions/BlockAction'
import ApproveAction from '../Actions/ApproveAction'
import UnblockAction from "../Actions/UnblockAction";

export default function ActionsDropdown({
    blockAction,
    editAction,
    deleteAction,
    changeRoleAction,
    approveAction,
    objectId,
    removeUser,
    setDropdownIsExpanded,
    userRole,
    userIsBlocked,
    removeRecipe,
    removeComment,
    setSuccessMessage,
    setShowSuccessMessage,
}) {
    return (
        <TouchableOpacity style={actionsDropdownStyles.container} >
            {
                deleteAction &&
                <DeleteAction
                    collection={deleteAction}
                    objectId={objectId}
                    removeUser={removeUser}
                    removeRecipe={removeRecipe}
                    removeComment={removeComment}
                />
            }
            {
                editAction &&
                <EditAction
                    collection={editAction}
                    objectId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                />
            }
            {
                changeRoleAction &&
                <ChangeRoleAction
                    collection={changeRoleAction}
                    userId={objectId}
                    userRole={userRole}
                />
            }
            {
                blockAction && !userIsBlocked &&
                <BlockAction
                    collection={blockAction}
                    userId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
            {
                blockAction && userIsBlocked &&
                <UnblockAction
                    collection={blockAction}
                    userId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
            {
                approveAction &&
                <ApproveAction
                    collection={approveAction}
                    recipeId={objectId}
                    setDropdownIsExpanded={setDropdownIsExpanded}
                    setSuccessMessage={setSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            }
        </TouchableOpacity>
    );
}