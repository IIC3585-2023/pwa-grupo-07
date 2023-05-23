import { getAllEvents, getEvent } from '../db.js';
import { payments, getBalances } from './payments.js';

const btnAddTransaction = document.getElementById('btn-add-transaction');

// Add event listener to the button
btnAddTransaction.addEventListener('click', transactionForm);

// Define the transactionForm function
function transactionForm() {
  const queryParams = new URLSearchParams(window.location.search);
  const eventId = queryParams.get('event');
  window.location.href = `/new_transaction.html?event=${eventId}`;
}

const getEventId = () => {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('event');
};

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Completar Dropdown con todos los eventos
    const eventsList = await getAllEvents();

    const eventDropdownElement = document.querySelector('#event_dropdown');
    for (let event of eventsList) {
      const option = document.createElement('option');
      option.value = event.id;
      option.text = event.name;

      // Set the default selected option based on the event ID
      if (event.id === getEventId()) {
        option.selected = true;
      }

      eventDropdownElement.appendChild(option);
    }

    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    // Completar Html con Data del Evento
    const eventId = getEventId();
    setIndividualBalance(eventId);
    setHome(eventId);

    eventDropdownElement.addEventListener('change', function () {
      // Replace the current URL without reloading the page
      var url = new URL(window.location.href);
      url.searchParams.set('event', eventDropdownElement.value);
      window.history.replaceState(null, null, url);

      const eventId = getEventId();
      setIndividualBalance(eventId);
      setHome(eventId);
    });
  } catch (error) {
    console.error('Error al obtener el evento:', error);
  }
});

async function setHome(selectedEventId) {
  const eventData = await getEvent(selectedEventId);
  const selectedEvent = eventData[0];
  let transactionQuantity = selectedEvent.transactions.length;
  const transactionResumeElement = document.querySelector(
    '.transaction_resume'
  );
  transactionResumeElement.innerHTML = `
                                        <div>
                                        Showing ${transactionQuantity} expenses
                                        </div>
                                        <div>
                                        Total of <span class="bold">${selectedEvent.totalSpending} USD</span>
                                        </div>
                                        `;

  const transactionListElement = document.querySelector('.transaction_list');
  transactionListElement.innerHTML = '<ul>';

  for (let transaction of selectedEvent.transactions) {
    const date = new Date(transaction.date);
    const monthNumber = date.getMonth();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[monthNumber];
    const day = String(date.getDate()).padStart(2, '0');

    const payer = selectedEvent.participants[transaction.payer];
    const participantIndexes = transaction.participants;
    const participantNames = participantIndexes.reduce((result, index) => {
      if (result !== '') {
        result += ', ';
      }
      result += selectedEvent.participants[index];
      return result;
    }, '');

    transactionListElement.innerHTML += `
                                <li class="shadow_container transaction_item">
                                    <div class="transaction_date">
                                        <div class="month">${month}</div>
                                        <div class="day">${day}</div>
                                    </div>
                                    <div class="transaction_info">
                                        <span class="bold">${payer}</span> paid for ${transaction.name}
                                        <div class="participants">
                                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 25 32"><path d="M25.143 25.089q0 2.143-1.304 3.384t-3.464 1.241H4.768q-2.161 0-3.464-1.241T0 25.089q0-.946.063-1.848t.25-1.946.473-1.938.768-1.741 1.107-1.446 1.527-.955 1.991-.357q.161 0 .75.384t1.33.857 1.929.857 2.384.384 2.384-.384 1.929-.857 1.33-.857.75-.384q1.089 0 1.991.357t1.527.955 1.107 1.446.768 1.741.473 1.938.25 1.946.063 1.848zM19.429 9.143q0 2.839-2.009 4.848T12.572 16t-4.848-2.009-2.009-4.848 2.009-4.848 4.848-2.009 4.848 2.009 2.009 4.848z"></path></svg>
                                            &nbsp ${participantNames}
                                        </div>
                                    </div>
                                    <div class="transaction_value">
                                        <div>${transaction.ammount} USD</div>
                                    </div>
                                </li>`;
  }
  transactionListElement.innerHTM += '</ul>';
}

async function setIndividualBalance(selectedEventId) {
  const eventData = await getEvent(selectedEventId);
  const balances = getBalances(eventData[0]);
  console.log(payments(eventData[0]));
  const eventParticipants = eventData[0].participants;
  console.log(eventParticipants);
  const container = document.querySelector('.shadow_container');
  container.innerHTML = '';

  const ulElement = document.createElement('ul');
  for (let person in eventParticipants) {
    const liElement = document.createElement('li');
    liElement.className = 'balance_item';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'balance_person_name';

    const nameHeading = document.createElement('h5');
    nameHeading.textContent = eventParticipants[person];

    nameDiv.appendChild(nameHeading);

    const balanceDiv = document.createElement('div');
    balanceDiv.className = '';

    const balanceHeading = document.createElement('h5');
    balanceHeading.textContent = `${balances[person].toFixed(2)} USD`;
    if (balances[person] >= 0) {
      balanceDiv.className = 'person_balance positive';
    } else {
      balanceDiv.className = 'person_balance negative';
    }

    balanceDiv.appendChild(balanceHeading);

    liElement.appendChild(nameDiv);
    liElement.appendChild(balanceDiv);

    ulElement.appendChild(liElement);
  }
  container.appendChild(ulElement);
}
