import Chart from '../../node_modules/chart.js/auto/auto.esm.js';

export function drawVisitationsChart() {
    const chartContext = document.querySelector('.visitations-chart').getContext('2d');

    const chartGradient = chartContext.createLinearGradient(0, 0, 0, 400);
    chartGradient.addColorStop(0, 'rgba(111,115,255,1)');
    chartGradient.addColorStop(0.72, 'rgba(124,113,192,0.09086408000700286)');

    let delayed;

    const chartData = {
        labels: ["Януари", "Февуари", "Март", "Април", "Май", "Юни", "Юли", "Август"],
        datasets: [
            {
                data: [1200, 2100, 1340, 1600, 900, 1700, 1500, 2100],
                label: "Месечни посещения"
            }
        ]
    }

    const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
            animation: {
                x: {
                    easing: 'linear',
                },
                duration: 2000,
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 120 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        display: false,
                    },
                    beginAtZero: true,
                }
            },
            fill: true,
            backgroundColor: chartGradient,
            hitRadius: 50,
            tension: 0.45,
            radius: 0
        }
    }

    const visitationsChart = new Chart(chartContext, chartConfig);
}