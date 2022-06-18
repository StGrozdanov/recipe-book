import { View } from "react-native";
import { tableBodyStyles } from "./TableBodyStyleSheet";
import Cell from './TableBodyCell';
import Status from './TableBodyStatus';


export default function TableBody({ isToggled, data }) {
    data = Object.entries(data).slice(2);
    data.pop();

    return (
        <View style={[tableBodyStyles.additionalData, !isToggled && tableBodyStyles.toggledData]}>
            {
                data.map(content => {
                    return content[0] == 'Status'
                        ? <Status status={content[1]} />
                        : <Cell heading={content[0]} data={content[1]} />
                })
            }
        </View>
    );
}