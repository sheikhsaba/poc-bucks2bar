// Chart instance
let incomeExpenseChart = null;

// Month names for chart labels
const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('incomeExpenseChart');
    
    if (!ctx) {
        console.error('Canvas element not found');
        return;
    }
    
    // Get initial data
    const data = prepareChartData();
    
    incomeExpenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [
                {
                    label: 'Income',
                    data: data.income,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                },
                {
                    label: 'Expenses',
                    data: data.expenses,
                    backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

// Prepare data for chart from form inputs
function prepareChartData() {
    const data = getMonthlyData();
    const incomeData = [];
    const expenseData = [];
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    months.forEach(month => {
        incomeData.push(data[month] ? data[month].income : 0);
        expenseData.push(data[month] ? data[month].expense : 0);
    });
    
    return {
        income: incomeData,
        expenses: expenseData
    };
}

// Update chart with new data
function updateChart() {
    if (!incomeExpenseChart) {
        initializeChart();
        return;
    }
    
    const data = prepareChartData();
    incomeExpenseChart.data.datasets[0].data = data.income;
    incomeExpenseChart.data.datasets[1].data = data.expenses;
    incomeExpenseChart.update();
}

// Listen for data changes and update chart
document.addEventListener('dataChanged', updateChart);

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', initializeChart);
