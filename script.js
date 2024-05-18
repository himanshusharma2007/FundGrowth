document
  .getElementById("investment-form")
  .addEventListener("submit", Calculate);

function Calculate(e) {
  e.preventDefault();

  // Get input values and convert them to numbers
  let initialInvest = parseFloat(
    document.getElementById("initial-investment").value
  );
  let monthlyInvest = parseFloat(
    document.getElementById("monthly-contribution").value
  );
  let interestRate = parseFloat(
    document.getElementById("annual-interest-rate").value
  );
  let years = parseInt(document.getElementById("number-of-years").value, 10);

  if (
    isNaN(initialInvest) ||
    isNaN(monthlyInvest) ||
    isNaN(interestRate) ||
    isNaN(years)
  ) {
    showErrorModal("Invalid input. Please enter numeric values.");
    return;
  }

  let deposit = initialInvest;
  for (let i = 1; i <= years; i++) {
    deposit += monthlyInvest * 12;
    let yearProfit = deposit * (interestRate / 100);
    deposit += yearProfit;
  }
  let userInvest = initialInvest + years * 12 * monthlyInvest;
  let profit = deposit - (initialInvest + years * 12 * monthlyInvest);

  displayResult(userInvest, deposit.toFixed(2), profit.toFixed(2));
}

function displayResult(userInvest, finalBalance, totalProfit) {
  document.getElementById(
    "your-investment"
  ).textContent = `Your Investment: ${userInvest.toFixed(2)}`;
  document.getElementById(
    "final-balance"
  ).textContent = `Final Balance: ${finalBalance}`;
  document.getElementById(
    "total-profit"
  ).textContent = `Total Profit: ${totalProfit}`;
  $("#resultModal").modal("show");
}

function showErrorModal(message) {
  $("#resultModal .modal-body").html(`<p class="text-danger">${message}</p>`);
  $("#resultModal").modal("show");
}
