const form = document.getElementById('expense-form');
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const shoppingDisplay = document.getElementById('shopping');
const foodDisplay = document.getElementById('food');
const billsDisplay = document.getElementById('bills');
const othersDisplay = document.getElementById('others');
const transactionList = document.getElementById('transaction-list');
const toggleChartButton = document.getElementById('toggle-chart');
const expenseChartCanvas = document.getElementById('expense-chart');
const showTransactionsButton = document.getElementById('show-transactions');
const transactionSection = document.getElementById('transaction-section');

let balance = 0;
let income = 0;
let shopping = 0;
let food = 0;
let bills = 0;
let others = 0;

let currentChartType = 'pie';
let expenseChart;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const purpose = document.getElementById('purpose').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (category === 'Income') {
    income += amount;
    balance += amount;
  } else {
    balance -= amount;
    if (category === 'Shopping') shopping += amount;
    if (category === 'Food') food += amount;
    if (category === 'Bills') bills += amount;
    if (category === 'Others') others += amount;
  }

  updateUI();
  addTransaction(purpose, category, amount);
  updateChart();
  form.reset();
});

toggleChartButton.addEventListener('click', function () {
  currentChartType = currentChartType === 'pie' ? 'bar' : 'pie';
  renderChart();
});

showTransactionsButton.addEventListener('click', function () {
  transactionSection.style.display = transactionSection.style.display === 'none' ? 'block' : 'none';
});

function updateUI() {
  balanceDisplay.innerHTML = `<span style="color: black;">INR</span> ${balance.toFixed(2)}`;
  incomeDisplay.innerHTML = `Income: <span style="color: black;">INR</span> ${income.toFixed(2)}`;
  shoppingDisplay.innerHTML = `Shopping: <span style="color: black;">INR</span> ${shopping.toFixed(2)}`;
  foodDisplay.innerHTML = `Food: <span style="color: black;">INR</span> ${food.toFixed(2)}`;
  billsDisplay.innerHTML = `Bills & Utilities: <span style="color: black;">INR</span> ${bills.toFixed(2)}`;
  othersDisplay.innerHTML = `Others: <span style="color: black;">INR</span> ${others.toFixed(2)}`;
}

function addTransaction(purpose, category, amount) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${purpose}</td>
    <td>${category}</td>
    <td>${amount.toFixed(2)}</td>
  `;
  transactionList.appendChild(row);
}

function updateChart() {
  if (expenseChart) {
    expenseChart.data.datasets[0].data = [income, shopping, food, bills, others];
    expenseChart.update();
  }
}

function renderChart() {
  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(expenseChartCanvas, {
    type: currentChartType,
    data: {
      labels: ['Income', 'Shopping', 'Food', 'Bills & Utilities', 'Others'],
      datasets: [
        {
          label: 'Expenses',
          data: [income, shopping, food, bills, others],
          backgroundColor: ['#4caf50', '#ff6384', '#ffcd56', '#36a2eb', '#8e44ad'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { enabled: true },
      },
    },
  });
}

// Initialize the chart on page load
renderChart();
