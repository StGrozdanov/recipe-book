import { Text, View, Dimensions } from "react-native";
import { chartStyles } from "./ChartStyleSheet";
import { LineChart } from "react-native-chart-kit";

const chartData = {
        labels: ["Януари", "Февуари", "Март", "Април", "Май", "Юни", "Юли", "Август"],
        datasets: [
            {
                data: [1200, 2100, 1340, 1600, 900, 1700, 1500, 2100],
            }
        ]
}

const chartConfig = {
    backgroundGradientFrom: "#D7D9EF",
    backgroundGradientTo: "#cacce6",
    backgroundGradientToOpacity: 0.85,
    fillShadowGradientTo: "rgba(111,115,255,1)",
    fillShadowGradientToOpacity: 0,
    fillShadowGradientFrom: "rgba(124,113,192,0.09086408000700286)",
    fillShadowGradientFromOpacity: 0.72,
    color: (opacity = 1) => `rgba(111,115,255, ${opacity})`,
    color: (opacity = 0.72) => `rgba(124,113,192, ${opacity})`,
    strokeWidth: 2,
    propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#483d8bba"
    },
    propsForHorizontalLabels: {
    },
}

export default function Chart({ title }) {
    return (
        <View style={chartStyles.container}>
            <Text style={chartStyles.title}>{title}</Text>
            <LineChart
                data={chartData}
                width={Dimensions.get("window").width - 20}
                height={Dimensions.get("window").height * 0.25}
                chartConfig={chartConfig}
                bezier
                style={{ borderRadius: 20 }}
            />
        </View>
    );
};