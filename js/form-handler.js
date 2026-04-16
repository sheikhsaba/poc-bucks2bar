// Month names
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Store all input values
const monthlyData = {};

// Initialize form inputs
function initializeFormInputs() {
    const container = document.getElementById('monthlyInputs');
    
    months.forEach((month, index) => {
        monthlyData[month] = { income: 0, expense: 0 };
        
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-4';
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-header bg-primary text-white">
                    <h5 class="card-title mb-0">${month}</h5>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="income-${index}" class="form-label">Income</label>
                        <input 
                            type="number" 
                            class="form-control income-input" 
                            id="income-${index}" 
                            data-month="${month}"
                            placeholder="0.00" 
                            min="0" 
                            step="0.01"
                        >
                    </div>
                    <div class="mb-3">
                        <label for="expense-${index}" class="form-label">Expense</label>
                        <input 
                            type="number" 
                            class="form-control expense-input" 
                            id="expense-${index}" 
                            data-month="${month}"
                            placeholder="0.00" 
                            min="0" 
                            step="0.01"
                        >
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
    
    // Add event listeners to all inputs
    addInputEventListeners();
}

// Add event listeners to capture input changes
function addInputEventListeners() {
    // Income inputs
    document.querySelectorAll('.income-input').forEach(input => {
        input.addEventListener('change', handleInputChange);
        input.addEventListener('blur', handleInputChange);
    });
    
    // Expense inputs
    document.querySelectorAll('.expense-input').forEach(input => {
        input.addEventListener('change', handleInputChange);
        input.addEventListener('blur', handleInputChange);
    });
}

// Handle input value changes
function handleInputChange(event) {
    const input = event.target;
    const month = input.dataset.month;
    const value = parseFloat(input.value) || 0;
    
    if (input.classList.contains('income-input')) {
        monthlyData[month].income = value;
    } else if (input.classList.contains('expense-input')) {
        monthlyData[month].expense = value;
    }
    
    // Dispatch custom event so chart knows to update
    document.dispatchEvent(new CustomEvent('dataChanged'));
}

// Get all monthly data
function getMonthlyData() {
    return monthlyData;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeFormInputs);
