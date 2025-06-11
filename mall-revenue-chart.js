document.addEventListener('DOMContentLoaded', () => {
    const ctx7 = document.getElementById('chart7').getContext('2d');
    new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: ['ТЦ Центральный', 'ТЦ Северный', 'ТЦ Южный'],
            datasets: [{
                label: 'Доход (тыс. TJS.)',
                data: [65000, 45000, 35000],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { title: { display: true, text: '7. Доход каждого торгового центра' } }
        }
    });
});