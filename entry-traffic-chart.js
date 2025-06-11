document.addEventListener('DOMContentLoaded', () => {
    const ctx6 = document.getElementById('chart6').getContext('2d');
    new Chart(ctx6, {
        type: 'pie',
        data: {
            labels: ['Главный вход', 'Боковой вход', 'Парковка'],
            datasets: [{
                data: [50, 30, 20],
                backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { title: { display: true, text: '6. Трафик по Входам' } }
        }
    });
});