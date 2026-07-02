const incomeInput = document.getElementById("income");
const rentInput = document.getElementById("rent");
const foodInput = document.getElementById("food");
const transportInput = document.getElementById("transport");

const resultBox = document.getElementById("result");

document.getElementById("calculate-btn").addEventListener("click", () => {

    const income = Number(incomeInput.value);
    const rent = Number(rentInput.value);
    const food = Number(foodInput.value);
    const transport = Number(transportInput.value);

    const totalExpenses = rent + food + transport;
    const balance = income - totalExpenses;

    let message = "";

    if (balance > 0) {
        message = `You are saving $${balance} per month 👍`;
    } 
    else if (balance === 0) {
        message = "You are breaking even ⚖️";
    } 
    else {
        message = `You are over budget by $${Math.abs(balance)} ⚠️`;
    }

    resultBox.textContent = message;

});
