import { addEventTransaction } from '../db.js';
import { getEvent } from '../db.js';

let eventParticipants;

function sendNotification(payer, ammount) {
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAX_XcYR0:APA91bG1XgFjSREl02ZcjneH10y3iB1sxTG5nc6GNV6tLy0_xWluCAeamZAh7q3Ds89RRRztHSscgqutQuwzw8SNV9abb1l0iuJaXzHBaprWx3jmpnfDHbfHhkIvsO7BxCqB4ffLowdG',
    },
    body: JSON.stringify({
      notification: {
        title: 'New transaction',
        body: `${payer} paid ${ammount}`,
        icon: '',
      },
      registration_ids: [
        'dtZkBUPFZKxIVQMlwB8M_D:APA91bFCv92zNw0fr-ogqj_QYvKREy28mkcNw-hu1tL9ZgP3zLwgkSF2p3N0yxji1DYX0mfHRm3px7d5rZa-rPvJYyFrxJkqqbs5nZ14aT50hWQUrNWyra8zJkU9grNNG9k9_L6nZVd7',
      ],
    }),
  });
}

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

createTransaction.addEventListener('click', async function (e) {
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

  const eventFetch = await getEvent(getEventId());
  const event = eventFetch[0];
  console.log(event);
  addEventTransaction(getEventId(), newTransaction);
  console.log(newTransaction);
  sendNotification(
    event.participants[parseInt(newTransaction.payer)] || 'Someone',
    newTransaction.ammount
  );
  window.location.href = `/home.html?event=${getEventId()}`;
  // sendNotification
});
