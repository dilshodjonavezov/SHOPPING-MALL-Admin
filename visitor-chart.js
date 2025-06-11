document.addEventListener('DOMContentLoaded', () => {
    const ctx4 = document.getElementById('chart4').getContext('2d');
    new Chart(ctx4, {
        type: 'line',
        data: {
            labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06'],
            datasets: [{
                label: 'Количество Посетителей',
                data: [1000, 1200, 1300, 1250, 1150, 1400],
                borderColor: '#f1c40f',
                backgroundColor: 'rgba(241, 196, 15, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: '4. Количество Посетителей' } }
        }
    });
});