import { Text, View, Dimensions } from "react-native";
import { chartStyles } from "./ChartStyleSheet";
import { LineChart } from "react-native-chart-kit";
import { CHART_CONFIGURATION } from "../../configurations/chartConfig";
import { useThemeContext } from "../../hooks/useThemeContext";

export default function Chart({ title, data }) {
    const { theme } = useThemeContext();

    return (
        <View style={chartStyles.container}>
            <Text style={chartStyles[theme + 'Title']}>{title}</Text>
            <LineChart
                data={data}
                width={Dimensions.get("window").width * 1.1}
                height={Dimensions.get("window").height * 0.3}
                chartConfig={CHART_CONFIGURATION}
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