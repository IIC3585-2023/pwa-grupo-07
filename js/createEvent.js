import { readFile, writeFile } from 'fs';

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
  console.log(event);
  readFile('db.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      const length = obj.length.toString();
      const push = {};
      push[length] = event;
      obj.push(push);
      json = JSON.stringify(obj);
      writeFile('db.json', json, 'utf8', function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});