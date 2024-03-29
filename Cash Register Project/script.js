let price = 19.5; // This can be dynamically adjusted per your scenario
let cid = [
  ["PENNY", 0.5], // Update as needed for different user stories
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const currencyUnits = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  let changeDue = cash - price;
  let cidTotal = cid.reduce((acc, curr) => acc + curr[1], 0);
  cidTotal = Math.round(cidTotal * 100) / 100; // Correct rounding error

  if (changeDue > cidTotal) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeDue === cidTotal) {
    return { status: "CLOSED", change: cid };
  } else {
    let change = [];
    let cidCopy = JSON.parse(JSON.stringify(cid)); // Deep copy to avoid mutating original cid

    for (let i = cidCopy.length - 1; i >= 0; i--) {
      let coinValue = currencyUnits[cidCopy[i][0]];
      let coinAmount = 0;
      while (changeDue >= coinValue && cidCopy[i][1] > 0) {
        changeDue -= coinValue;
        changeDue = Math.round(changeDue * 100) / 100; // Fix floating point precision
        cidCopy[i][1] -= coinValue;
        coinAmount += coinValue;
        cidCopy[i][1] = Math.round(cidCopy[i][1] * 100) / 100; // Fix potential floating point precision issues
      }
      if (coinAmount > 0) {
        change.push([cidCopy[i][0], coinAmount]);
      }
    }

    let changeTotal = change.reduce((acc, curr) => acc + curr[1], 0);
    changeTotal = Math.round(changeTotal * 100) / 100; // Correct rounding error

    if (changeDue > 0 || changeTotal < cash - price) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change };
  }
}

document.getElementById("purchase-btn").addEventListener("click", function () {
  const cashGiven = parseFloat(document.getElementById("cash").value);
  const changeDueElement = document.getElementById("change-due");

  if (cashGiven < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashGiven === price) {
    // Directly handle the case where cash given equals the price
    changeDueElement.textContent =
      "No change due - customer paid with exact cash";
  } else {
    const result = checkCashRegister(price, cashGiven, cid);
    if (result.status === "INSUFFICIENT_FUNDS") {
      changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "CLOSED") {
      let changeText = "Status: CLOSED ";
      result.change.forEach(([denom, amount]) => {
        changeText += `${denom}: $${amount.toFixed(2)} `;
      });
      changeDueElement.textContent = changeText.trim();
    } else {
      let changeMessage = "Status: OPEN ";
      result.change.forEach(([denom, amount]) => {
        changeMessage += `${denom}: $${amount.toFixed(2)} `;
      });
      changeDueElement.textContent = changeMessage.trim();
    }
  }
});
