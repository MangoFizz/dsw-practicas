const labels = ['1 año', '2 años'];
const datos = [24000, 27000];
const colores = [
    'rgba(255, 99, 132)',
    'rgba(255, 159, 64)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
    'rgba(54, 162, 235)',
    'rgba(153, 102, 255)',
    'rgba(201, 203, 207)'
];
const borders = [
    'rgba(255, 99, 132)',
    'rgba(255, 159, 64)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
    'rgba(54, 162, 235)',
    'rgba(153, 102, 255)',
    'rgba(201, 203, 207)'
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Mis inversiones',
        data: datos,
        backgroundColor: colores,
        borderColor: borders,
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    plugins: [ChartDataLabels],
    options: {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                anchor: 'end',
                clamp: true,
                align: 'top',
                offset: 0,
                formatter: function(value, context) {
                    return '$' + new Intl.NumberFormat('es-MX').format(context.dataset.data[context.dataIndex]);
                }
            }
        }
    },
};

const ctx = document.querySelector('.grafica');
const graficaInvest = new Chart(ctx, config);

const slider = document.querySelector('.slider');
const ganancias = [24000, 27000, 34000, 40500, 46300, 48000, 54500];

slider.addEventListener('change', function() {
    graficaInvest.data.labels = ['1 año'];
    graficaInvest.data.datasets[0].data = [24000];

    for(i=2;i<=this.value;i++) {
        graficaInvest.data.labels.push(`${i} años`);
        graficaInvest.data.datasets[0].data.push(ganancias[i-1]);
    }
    graficaInvest.update();
})


