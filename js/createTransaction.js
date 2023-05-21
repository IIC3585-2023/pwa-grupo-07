import {events} from '../db.js';


const eventsData = events[0].uuid_evento; // Cambiar por evento seleccionado
const eventParticipants = Object.keys(eventsData.participants)

document.addEventListener('DOMContentLoaded', function() {
    const payerOptions = document.querySelector('#payer');
    payerOptions.innerHTML = ` <option value="" disabled=""> Select payer...</option>`
    const participantsCheckbox = document.querySelector('#payment_participants');
    for(const key in eventParticipants){
        payerOptions.innerHTML += ` <option value=${key}> ${eventsData.participants[key]} </option>`    
        participantsCheckbox.innerHTML +=`
                                        <label><input id=checkbox_${key} type="checkbox" class="filled-in" checked="checked" />
                                         <span>${eventsData.participants[key]}</span> </label>`

    }
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
    M.FormCheckbox.init(checkbox);
});

const transactionName = document.querySelector('#payment_reason');
const transactionPayer = document.querySelector('#payer');
const transactionAmount = document.querySelector('#payment_amount');
const transactionDate = document.querySelector('#payment_date');


const createTransaction = document.querySelector('#create-transaction');

createTransaction.addEventListener('click', function(e) {
e.preventDefault();
let transactionParticipants = []
for (let index in eventParticipants) {
    document.querySelector(`#checkbox_${index}`).checked && transactionParticipants.push(parseFloat(index))
}

const newTransaction = {
    name: transactionName.value,
    ammount: parseFloat(transactionAmount.value),
    payer: parseFloat(transactionPayer.value),
    participants: transactionParticipants,
    date: transactionDate.value
}
console.log(newTransaction)

events[0].uuid_evento.transactions.push(newTransaction) // Cambiar por evento seleccionado
events[0].uuid_evento.totalSpending += newTransaction.ammount // Cambiar por evento seleccionado
events[0].uuid_evento.payments[newTransaction.payer] += newTransaction.ammount // Cambiar por evento seleccionado
window.location.pathname = '../home.html';
});