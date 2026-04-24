// Handle tab switching
document.addEventListener('DOMContentLoaded', function() {
    const chartTab = document.getElementById('chart-tab');
    
    if (chartTab) {
        chartTab.addEventListener('shown.bs.tab', function() {
            // Update chart when Chart tab is opened
            if (typeof updateChart === 'function') {
                updateChart();
            }
        });
    }
});
