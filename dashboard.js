// Инициализация канвасов для графиков
const charts = {
    1: document.getElementById('chart1').getContext('2d'),
    2: document.getElementById('chart2').getContext('2d'),
    3: document.getElementById('chart3').getContext('2d'),
    4: document.getElementById('chart4').getContext('2d'),
    5: document.getElementById('chart5').getContext('2d'),
    6: document.getElementById('chart6').getContext('2d'),
    7: document.getElementById('chart7').getContext('2d')
};

// Данные для графиков (примерные, можно заменить на реальные данные)
const sampleData = {
    years: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'],
    revenue: [50000, 55000, 60000, 62000, 58000, 65000],
    profit: [20000, 22000, 25000, 26000, 23000, 27000],
    expenses: [30000, 33000, 35000, 36000, 35000, 38000],
    visitors: [1000, 1200, 1300, 1250, 1150, 1400],
    rentStatus: { paid: 80, overdue: 15, pending: 5 },
    entryTraffic: { main: 50, side: 30, parking: 20 },
    mallRevenues: [
        { name: 'ТЦ Центральный', revenue: 65000 },
        { name: 'ТЦ Северный', revenue: 45000 },
        { name: 'ТЦ Южный', revenue: 35000 }
    ]
};

// Создание графиков
new Chart(charts[1], {
    type: 'line',
    data: {
        labels: sampleData.years,
        datasets: [{
            label: 'Общая Выручка (тыс. TJS.)',
            data: sampleData.revenue,
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
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[2], {
    type: 'line',
    data: {
        labels: sampleData.years,
        datasets: [{
            label: 'Чистая Прибыль (тыс. TJS.)',
            data: sampleData.profit,
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[3], {
    type: 'bar',
    data: {
        labels: sampleData.years,
        datasets: [{
            label: 'Расходы (тыс. TJS.)',
            data: sampleData.expenses,
            backgroundColor: '#e74c3c',
            borderColor: '#e74c3c',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[4], {
    type: 'line',
    data: {
        labels: sampleData.years,
        datasets: [{
            label: 'Количество Посетителей',
            data: sampleData.visitors,
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
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[5], {
    type: 'doughnut',
    data: {
        labels: ['Оплачено', 'Просрочено', 'Ожидается'],
        datasets: [{
            data: [sampleData.rentStatus.paid, sampleData.rentStatus.overdue, sampleData.rentStatus.pending],
            backgroundColor: ['#2ecc71', '#e74c3c', '#3498db'],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[6], {
    type: 'pie',
    data: {
        labels: ['Главный вход', 'Боковой вход', 'Парковка'],
        datasets: [{
            data: [sampleData.entryTraffic.main, sampleData.entryTraffic.side, sampleData.entryTraffic.parking],
            backgroundColor: ['#3498db', '#e74c3c', '#2ecc71'],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } }
    }
});

new Chart(charts[7], {
    type: 'bar',
    data: {
        labels: sampleData.mallRevenues.map(m => m.name),
        datasets: [{
            label: 'Доход (тыс. TJS.)',
            data: sampleData.mallRevenues.map(m => m.revenue),
            backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: 'top' } }
    }
});