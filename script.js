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
    othersEl.textContent = `INR ${others.toFixed(2
