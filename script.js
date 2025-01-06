document.addEventListener('DOMContentLoaded', () => {
  // Initial data
  let balance = 0;
  let income = 0;
  let shopping = 0;
  let food = 0;
  let bills = 0;
  let others = 0;
  const transactions = [];

  const balanceEl = document.getElementById('balance');
  const incomeEl = document.getElementById('income');
  const shoppingEl = document.getElementById('shopping');
  const foodEl = document.getElementById('food');
  const billsEl = document.getElementById('bills');
  const othersEl = document.getElementById('others');
  const expenseForm = document.getElementById('expense-form');
  const transactionList = document.getElementById('transaction-list').getElementsByTagName('tbody')[0];
  const showTransactionsBtn = document.getElementById('show-transactions');
  const transactionSection = document.getElementById('transaction-section');
  const toggleChartBtn = document.getElementById('toggle-chart');
  const expenseChart = document.getElementById('expense-chart').getContext('2d');

  // Update balance display
  const updateBalance = () => {
    balance = income - (shopping + food + bills + others);
    balanceEl.textContent = `INR ${balance.toFixed(2)}`;
    incomeEl.textContent = `INR ${income.toFixed(2)}`;
    shoppingEl.textContent = `INR ${shopping.toFixed(2)}`;
    foodEl.textContent = `INR ${food.toFixed(2)}`;
    billsEl.textContent = `INR ${bills.toFixed(2)}`;
    othersEl.textContent = `INR ${others.toFixed(2)}`;
  };

  // Add new transaction
  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const purpose = document.getElementById('purpose').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      Toastify({
        text: "Please enter a valid amount",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc3a0)",
      }).showToast();
      return;
    }

    // Update respective category
    if (category === 'Income') {
      income += amount;
    } else if (category === 'Shopping') {
      shopping += amount;
    } else if (category === 'Food') {
      food += amount;
    } else if (category === 'Bills') {
      bills += amount;
    } else {
      others += amount;
    }

    // Add transaction to the list
    transactions.push({ purpose, category, amount });
    updateBalance();

    // Update transaction history table
    const row = transactionList.insertRow();
    row.insertCell(0).textContent = purpose;
    row.insertCell(1).textContent = category;
    row.insertCell(2).textContent = `INR ${amount.toFixed(2)}`;

    // Display a success toast notification
    Toastify({
      text: "Transaction added successfully",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();

    // Clear form inputs
    expenseForm.reset();
    renderChart();
  });

  // Show/hide transaction history
  showTransactionsBtn.addEventListener('click', () => {
    if (transactionSection.style.display === 'none') {
      transactionSection.style.display = 'block';
      showTransactionsBtn.textContent = "Hide Transaction History";
    } else {
      transactionSection.style.display = 'none';
      showTransactionsBtn.textContent = "Show Transaction History";
    }
  });

  // Chart rendering function
  let chartType = 'pie'; // default to pie chart

  const renderChart = () => {
    const chartData = {
      labels: ['Income', 'Shopping', 'Food', 'Bills', 'Others'],
      datasets: [{
        label: 'Expenses',
        data: [income, shopping, food, bills, others],
        backgroundColor: ['#007bff', '#28a745', '#f39c12', '#e74c3c', '#9b59b6'],
        hoverBackgroundColor: ['#0056b3', '#218838', '#e67e22', '#c0392b', '#8e44ad'],
      }]
    };

    // Remove the existing chart
    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(expenseChart, {
      type: chartType,
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  };

  // Toggle chart type between pie and bar
  toggleChartBtn.addEventListener('click', () => {
    chartType = chartType === 'pie' ? 'bar' : 'pie';
    renderChart();
  });

  renderChart(); // Initial render
});
