import { View } from "react-native";
import { tableBodyStyles } from "./TableBodyStyleSheet";
import Cell from './TableBodyTypes/TableBodyCell';
import Status from './TableBodyTypes/TableBodyStatus';
import Owner from "./TableBodyTypes/TableBodyOwner";
import Location from "./TableBodyTypes/TableBodyLocation";

const CELL_TYPES = {
    Status: (cellData) => <Status status={cellData} />,
    Owner: (location) => <Owner pointer={location} />,
    Location: (location) => <Location pointer={location} />,
}

export default function TableBody({ isToggled, data }) {
    data = Object.entries(data).slice(2);
    data.pop();

    return (
        <View style={[tableBodyStyles.additionalData, !isToggled && tableBodyStyles.toggledData]}>
            {
                data.map(content => {
                    const cellHeading = content[0];
                    const cellData = content[1];

                    return CELL_TYPES.hasOwnProperty(cellHeading)
                        ? CELL_TYPES[cellHeading](cellData)
                        : <Cell heading={cellHeading} data={cellData} />
                })
            }
        </View>
    );
}