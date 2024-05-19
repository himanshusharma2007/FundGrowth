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
    showErrorModal(
      "Invalid input. Please enter numeric values in all of the feilds."
    );
    return;
  }

  let deposit = initialInvest;
  for (let i = 1; i <= years; i++) {
    deposit += monthlyInvest * 12;
    let yearProfit = deposit * (interestRate / 100);
    deposit += yearProfit;
  }
  let userInvest = initialInvest + years * 12 * monthlyInvest;
  let profit = deposit - userInvest;

  displayResult(userInvest, deposit.toFixed(2), profit.toFixed(2));
}

function displayResult(userInvest, finalBalance, totalProfit) {
  const yourInvestmentElement = document.getElementById("your-investment");
  const finalBalanceElement = document.getElementById("final-balance");
  const totalProfitElement = document.getElementById("total-profit");

  if (yourInvestmentElement && finalBalanceElement && totalProfitElement) {
    yourInvestmentElement.textContent = `Your Investment: ${userInvest.toFixed(
      2
    )}`;
    finalBalanceElement.textContent = `Final Balance: ${finalBalance}`;
    totalProfitElement.textContent = `Total Profit: ${totalProfit}`;
    $("#resultModal").modal("show");
  }
}

function showErrorModal(message) {
  const errorModal = document.getElementById("error-modal");
  const errorMessage = document.getElementById("error-message");
  const closeButton = document.getElementById("close-error-modal");

  console.log(closeButton);
  if (errorModal) {
    errorModal.style.display = "block";
     closeButton.addEventListener("click", () => {
       errorModal.style.display = "none";
     });
     errorMessage.textContent=message;
  
   
  }
}
