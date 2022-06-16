import { Text, View } from "react-native";
import { dashboardStyles } from "./DashboardStyleSheet";
import StatsCard from "../StatsCard/StatsCard";
import Chart from "../StatisticChart/Chart";

export default function Dashboard({ navigation }) {
    return (
        <View>
            <View style={dashboardStyles.statsCardContainer}>
                <StatsCard text={"ПУБЛИКАЦИИ"} value={19} />
                <StatsCard text={"ПОТРЕБИТЕЛИ"} value={5} />
                <StatsCard text={"КОМЕНТАРИ"} value={8} />
                <StatsCard text={"ПОСЕЩЕНИЯТА ДНЕС"} value={131} />
            </View>
            <Chart title={"Месечни посещения"} />
        </View>
    );
}