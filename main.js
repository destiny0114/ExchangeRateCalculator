const currencyEl_one = document.getElementById('currency-one');
const ammountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const ammountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

currencyEl_one.addEventListener('change', calculate);
ammountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
ammountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', (e) => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;

    calculate();
});

calculate();

function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            ammountEl_two.value = (ammountEl_one.value * rate).toFixed(2);
        });
}
