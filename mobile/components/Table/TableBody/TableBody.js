import { View } from "react-native";
import { tableBodyStyles } from "./TableBodyStyleSheet";
import Cell from './TableBodyTypes/TableBodyCell';
import Status from './TableBodyTypes/TableBodyStatus';
import Owner from "./TableBodyTypes/TableBodyOwner";
import Location from "./TableBodyTypes/TableBodyLocation";
import { useThemeContext } from "../../../hooks/useThemeContext";

const CELL_TYPES = {
    Status: (cellData, cellKey) => <Status status={cellData} key={cellKey} />,
    Owner: (location, cellKey) => <Owner pointer={location} key={cellKey} />,
    Location: (location, cellKey) => <Location pointer={location} key={cellKey} />,
}

export default function TableBody({ isToggled, data }) {
    data = Object.entries(data);

    const { theme } = useThemeContext();

    return (
        <View style={[tableBodyStyles[theme + 'AdditionalData'], !isToggled && tableBodyStyles.toggledData]}>
            {
                data.map((content, id) => {
                    const cellHeading = content[0];
                    const cellData = content[1];

                    return CELL_TYPES.hasOwnProperty(cellHeading)
                        ? CELL_TYPES[cellHeading](cellData, id)
                        : <Cell heading={cellHeading} data={cellData} key={id} />
                })
            }
        </View>
    );
}