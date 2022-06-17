import { Text, View, Dimensions } from "react-native";
import { chartStyles } from "./ChartStyleSheet";
import { LineChart } from "react-native-chart-kit";

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

const chartConfig = {
    backgroundGradientFrom: "#D7D9EF",
    backgroundGradientTo: "#cacce6",
    decimalPlaces: 0, 
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
                width={Dimensions.get("window").width * 1.1}
                height={Dimensions.get("window").height * 0.3}
                chartConfig={chartConfig}
                bezier={true}
                style={{ borderRadius: 20 }}
                withOuterLines={false}
                withVerticalLines={false}
                fromZero={true}
                transparent={true}
                segments={3}
            />
        </View>
    );
};