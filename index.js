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



