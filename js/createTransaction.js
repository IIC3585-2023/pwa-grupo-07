import { addEventTransaction } from '../db.js';
import { getEvent } from '../db.js';

let eventParticipants;

const getEventId = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('event');
};

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const eventData = await getEvent(getEventId());
    const event = eventData[0];
    console.log(event);
    eventParticipants = Object.keys(event.participants);
    const payerOptions = document.querySelector('#payer');
    payerOptions.innerHTML = ` <option value="" disabled=""> Select payer...</option>`;
    const participantsCheckbox = document.querySelector(
      '#payment_participants'
    );
    for (const key in eventParticipants) {
      payerOptions.innerHTML += ` <option value=${key}> ${event.participants[key]} </option>`;
      participantsCheckbox.innerHTML += `
                                            <label><input id=checkbox_${key} type="checkbox" class="filled-in" checked="checked" />
                                            <span>${event.participants[key]}</span> </label>`;
    }
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
  } catch (error) {
    console.error('Error al obtener el evento:', error);
  }
});

const transactionName = document.querySelector('#payment_reason');
const transactionPayer = document.querySelector('#payer');
const transactionAmount = document.querySelector('#payment_amount');
const transactionDate = document.querySelector('#payment_date');

const createTransaction = document.querySelector('#create-transaction');

createTransaction.addEventListener('click', function (e) {
  e.preventDefault();
  let transactionParticipants = [];
  for (let index in eventParticipants) {
    document.querySelector(`#checkbox_${index}`).checked &&
      transactionParticipants.push(parseFloat(index));
  }

  const newTransaction = {
    name: transactionName.value,
    ammount: parseFloat(transactionAmount.value),
    payer: parseFloat(transactionPayer.value),
    participants: transactionParticipants,
    date: transactionDate.value,
  };
  addEventTransaction(getEventId(), newTransaction);
  console.log(newTransaction);
  window.location.href = `/home.html?event=${getEventId()}`;
  // sendNotification
});
