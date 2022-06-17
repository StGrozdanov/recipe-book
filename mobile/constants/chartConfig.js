export const CHART_CONFIGURATION = {
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