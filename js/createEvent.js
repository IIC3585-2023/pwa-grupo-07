import {events} from '../db.js';

const eventName = document.querySelector('#event_name');
const participants = document.querySelector('#add-input-list');

// create event
const createEvent = document.querySelector('#create-event');

// create event event
createEvent.addEventListener('click', function(e) {
  e.preventDefault();
  let participantsDict = {};
  let payments = {};
  for (let i = 0; i < participants.children.length; i++) {
    participantsDict[i] = participants.children[i].children[0].value;
    payments[i] = 0;
  };
  const event = {
    name: eventName.value,
    participants: participantsDict,
    transactions: {},
    totalSpending: 0,
    payments: payments
  };
  let obj = {};
  obj[events.length] = event;
  events.push(obj);
  console.log(events);
});