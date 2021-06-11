// Select Checkboxes
let firstRowChckBox   = document.getElementById("row-1");
let secondRowChckBox  = document.getElementById("row-2");
let thirdRowChckBox   = document.getElementById("row-3");
let fourthRowChckBox  = document.getElementById("row-4");

// Get all the transaction amounts
let transactionAmtsNodes = document.getElementsByClassName("table__cell_data_transaction-amt");
let transactionAmtsArr = [];
[...transactionAmtsNodes].forEach(node => transactionAmtsArr.push(parseFloat(node.innerText.substring(1))));

//Calculate Statement Balance and Amount Available to Pay
let statementBalEle = document.getElementById("stmt-bal");
let amtAvailToPlanEle = document.getElementById("amt-avail-to-plan");
let statementBal = transactionAmtsArr.reduce( (a, b) => a + b, 0);
let amtAvailToPlan = 0;
[...transactionAmtsArr].forEach(amt => {
  if(amt > 100){
    amtAvailToPlan +=amt;
  }
});

statementBalEle.innerText = "$".concat(statementBal);
amtAvailToPlanEle.innerText = "$".concat(amtAvailToPlan);

//Calculate the different plans
function calculatePlan(cardNode, transactionAmt, noOfMonths, monthlyPlanFeeRate){
  let monthlyPmtsEle = cardNode.querySelector("#monthly-payment");
  let monthlyPlanFeeEle = cardNode.querySelector("#monthly-plan-fee");
  let totalPlanFeeEle = cardNode.querySelector("#total-plan-fee");
  let totalCostEle = cardNode.querySelector("#total-cost");

  let monthlyPlanFee = monthlyPlanFeeRate * transactionAmt;
  let totalPlanFee = monthlyPlanFee * noOfMonths;
  let totalCost = transactionAmt + totalPlanFee;
  let monthlyPmts = totalCost/ noOfMonths ;

  monthlyPlanFeeEle.innerText = "$".concat(monthlyPlanFee.toFixed(2).toString());
  totalPlanFeeEle.innerText = "$".concat(totalPlanFee.toFixed(2).toString());
  totalCostEle.innerText = "$".concat(totalCost.toFixed(2).toString());
  monthlyPmtsEle.innerText = "$".concat(monthlyPmts.toFixed(2).toString());
}

function onRowSelect(checkBoxNode) {
  let planSelectorNode = document.getElementsByClassName("plan-selector")[0];
  let transactionAmtNode = checkBoxNode.parentNode.parentNode.getElementsByClassName("table__cell_data_transaction-amt")[0];
  let transactionAmt = parseFloat(transactionAmtNode.innerText);
  if (checkBoxNode.checked == true && transactionAmt > 100){
    planSelectorNode.classList.add("plan-selector_visible");
    let monthlyPlanFeeRate6 = 0.5/100;
    let monthlyPlanFeeRate12 = 0.7/100;
    let monthlyPlanFeeRate24 = 0.95/100;

    let card6MonthNode = document.getElementById("card-mon-6");
    let card12MonthNode = document.getElementById("card-mon-12");
    let card24MonthNode = document.getElementById("card-mon-24");

    calculatePlan(card6MonthNode, transactionAmt, 6, monthlyPlanFeeRate6);
    calculatePlan(card12MonthNode, transactionAmt, 12, monthlyPlanFeeRate12);
    calculatePlan(card24MonthNode, transactionAmt, 24, monthlyPlanFeeRate24);
  }
  if (checkBoxNode.checked != true || transactionAmt <= 100){
    planSelectorNode.classList.remove("plan-selector_visible");
  }
}

//Bind the EventListeners
firstRowChckBox.addEventListener("click", () => onRowSelect(firstRowChckBox));
secondRowChckBox.addEventListener("click", () => onRowSelect(secondRowChckBox));
thirdRowChckBox.addEventListener("click", () => onRowSelect(thirdRowChckBox));
fourthRowChckBox.addEventListener("click", () => onRowSelect(fourthRowChckBox));
