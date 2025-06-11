document.addEventListener('DOMContentLoaded', () => {
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
            datasets: [{
                label: 'Общая Выручка (тыс. TJS.)',
                data: [50000, 55000, 60000, 62000, 58000, 65000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: '1. Общая Выручка (Total Revenue)' } }
        }
    });
});