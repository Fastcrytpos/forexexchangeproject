// fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zt1SmKjD6ackdtIt9hCFDBSYZihEoAs1DJeBcUuG&currencies=EUR&base_currency=CAD`,{timeout:10000})
// .then(res=>res.json())
// .then(data=>{
//     console.log(data);
//     //createCurrency(data)
// })
// .catch(err=>console.log(err))
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Event listener for currency dropdowns (select)

let curr1=[ "USD","EUR","GBP","CAD","AUD","CNY","CHF","NZD","JPY"]
for (i of curr1) {
    let currency=document.createElement("option")
    currency.value=i;
    currency.textContent=i;
    fromCur.append(currency)
    //toCur.append(currency)
}
for (i of curr1) {
    let currency=document.createElement("option")
    currency.value=i;
    currency.textContent=i;
    toCur.append(currency)
}

fromCur.addEventListener("change",function(){
    let selectedfromcur=fromCur.selectedIndex;
    console.log(curr1[selectedfromcur])
})

toCur.addEventListener("change",function(){
    let selectedtocur=toCur.selectedIndex;
    console.log(curr1[selectedtocur])
})


getBtn.addEventListener("click", function(e) {
    e.preventDefault();
    const from = fromCur.value;
    const to = toCur.value;
    const amountVal = amount.value || 1;
    //if (from === to) {exRateTxt.innerText = "Please select a diffferent TO currency"};
    if (typeof amountVal !== 'number'){exRateTxt.innerText ="Please enter a number OR a diffferent TO currency"}
    if (from!==to || typeof amountVal === 'number'){
        exRateTxt.innerText = "Getting exchange rate...";
        try {
            fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zt1SmKjD6ackdtIt9hCFDBSYZihEoAs1DJeBcUuG&currencies=${to}&base_currency=${from}`,{timeout:10000})
            .then(res=>res.json())
            .then(data=>{
    
                let value=Object.values(Object.values(data)[0])[0]

            exRateTxt.innerText = `${amountVal} ${from} = ${value} ${to}`;
            })
            .catch(err=>console.log(err))
        } catch (err) {
            console.log(err);
        }}})





















// [fromCur, toCur].forEach((select, i) => {
//     for (let curCode in Country_List) {
//         const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
//         select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
//     }
//     select.addEventListener("change", () => {
//         const code = select.value;
//         const imgTag = select.parentElement.querySelector("img");
//         imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
//     });
// });

// // Function to get exchange rate from api

// async function getExchangeRate() {
//     const amountVal = amount.value || 1;
//     exRateTxt.innerText = "Getting exchange rate...";
//     try {
//         const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zt1SmKjD6ackdtIt9hCFDBSYZihEoAs1DJeBcUuG&currencies=${toCur.value}&base_currency=${fromCur.value}`,{timeout:10000});
//         const result = await response.json();
//         const exchangeRate = result.conversion_rates[toCur.value];
//         const totalExRate = (amountVal * exchangeRate).toFixed(2);
//         exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
//     } catch (error) {
//         exRateTxt.innerText = "Something went wrong...";
//     }
// }

// // Event listeners for button and exchange icon click

// window.addEventListener("load", getExchangeRate);
// getBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     getExchangeRate();
// });

// exIcon.addEventListener("click", () => {
//     [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
//     [fromCur, toCur].forEach((select) => {
//         const code = select.value;
//         const imgTag = select.parentElement.querySelector("img");
//         imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
//     });
//     getExchangeRate();
// });