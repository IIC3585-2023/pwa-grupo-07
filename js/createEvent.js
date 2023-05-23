import { addEvent } from '../db.js';

const eventName = document.querySelector('#event_name');
const participants = document.querySelector('#add-input-list');

// create event
const createEvent = document.querySelector('#create-event');

// create event event
createEvent.addEventListener('click', function (e) {
  e.preventDefault();
  let participantsDict = {};
  let payments = {};
  for (let i = 0; i < participants.children.length; i++) {
    participantsDict[i] = participants.children[i].children[0].value;
    payments[i] = 0;
  }
  const event = {
    uuid_event: generateEventId(),
    name: eventName.value,
    participants: participantsDict,
    transactions: [],
    totalSpending: 0,
    payments: payments,
  };
  addEvent(event);
  window.location.href = `../home.html?event=${event.uuid_event}`;
});

function generateEventId() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
