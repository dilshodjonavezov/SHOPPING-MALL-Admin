document.addEventListener('DOMContentLoaded', () => {
    const chartDom = document.getElementById('chart5');
    const myChart = echarts.init(chartDom);
    const option = {
        title: { text: '5. Динамика Арендных Платежей', left: 'center', top: '5%' },
        series: [{
            type: 'gauge',
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: '90%', // Увеличиваем радиус для большего размера
            axisLine: {
                lineStyle: {
                    width: 20,
                    color: [[0.7, '#3498db'], [1, '#e0e0e0']]
                }
            },
            pointer: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                fontSize: 40,
                offsetCenter: [0, '70%'],
                color: '#000'
            },
            data: [{ value: 70, name: 'Сбор платежей' }]
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());
});