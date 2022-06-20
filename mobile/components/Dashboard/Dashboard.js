import { View, ScrollView } from "react-native";
import { dashboardStyles } from "./DashboardStyleSheet";
import StatsCard from "../StatsCard/StatsCard";
import Chart from "../StatisticChart/Chart";
import UserCard from "../UserCard/UserCard";

const chartData = {
    labels: ["Март", "Април", "Май", "Юни", "Юли", "Август"],
    datasets: [
        {
            data: [
                1340, 1200, 500, 1700, 1500, 2100,
            ],
        }
    ],
}

export default function Dashboard({ navigation }) {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={dashboardStyles.statsCardContainer}>
                <StatsCard text={"ПУБЛИКАЦИИ"} value={19} />
                <StatsCard text={"ПОТРЕБИТЕЛИ"} value={5} />
                <StatsCard text={"КОМЕНТАРИ"} value={8} />
                <StatsCard text={"ПОСЕЩЕНИЯТА ДНЕС"} value={131} />
            </View>
            <Chart title={"Посещения за последните 6 месеца"} data={chartData} />
            <UserCard mostActiveUserName={'shushan'} />
        </ScrollView>
    );
}