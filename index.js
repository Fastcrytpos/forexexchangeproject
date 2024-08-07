
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

let curr1 = ["USD", "EUR", "GBP", "CAD", "AUD", "CNY", "CHF", "NZD", "JPY"];

// Populate the dropdowns
for (let i of curr1) {
    let optionFrom = document.createElement("option");
    optionFrom.value = i;
    optionFrom.textContent = i;
    fromCur.append(optionFrom);

    let optionTo = document.createElement("option");
    optionTo.value = i;
    optionTo.textContent = i;
    toCur.append(optionTo);
}

fromCur.addEventListener("change", function() {
    let selectedFromCur = fromCur.selectedIndex;
    console.log(curr1[selectedFromCur]);
});

toCur.addEventListener("change", function() {
    let selectedToCur = toCur.selectedIndex;
    console.log(curr1[selectedToCur]);
});

getBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const from = fromCur.value;
    const to = toCur.value;
    const amountVal = parseFloat(amount.value);

    if (isNaN(amountVal) || amountVal <= 0) {
        exRateTxt.innerText = "Please enter a valid number.";
        return;
    }

    if (from === to) {
        exRateTxt.innerText = "Please select a different TO currency.";
        return;
    }

    exRateTxt.innerText = "Getting exchange rate...";

    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zt1SmKjD6ackdtIt9hCFDBSYZihEoAs1DJeBcUuG&currencies=${to}&base_currency=${from}`)
        .then(res => res.json())
        .then(data => {
            let value = data.data[to];
            exRateTxt.innerText = `${amountVal} ${from} = ${amountVal * value} ${to}`;
        })
        .catch(err => {
            console.error(err);
            exRateTxt.innerText = "Failed to get exchange rate. Please try again.";
        });
});