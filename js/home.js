import {events} from '../db.js';


var eventsData = events[0].uuid_evento; // Cambiar por evento seleccionado
let transactionQuantity = eventsData.transactions.length

document.addEventListener('DOMContentLoaded', function() {
    const transactionResumeElement = document.querySelector('.transaction_resume');
    transactionResumeElement.innerHTML = `
                                        <div>
                                        Showing ${transactionQuantity} expenses
                                        </div>
                                        <div>
                                        Total of <span class="bold">${eventsData.totalSpending} USD</span>
                                        </div>
                                        `;
                               
    const transactionListElement = document.querySelector('.transaction_list');
    transactionListElement.innerHTM = '<ul>'
    for ( let transaction of eventsData.transactions){
        
        const date = new Date(transaction.date);
        const monthNumber = date.getMonth();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];
        const month = monthNames[monthNumber];
        const day = String(date.getDate()).padStart(2, "0");

        const payer = eventsData.participants[transaction.payer]
        const participantIndexes = transaction.participants;
        const participantNames = participantIndexes.reduce((result, index) => {
            if (result !== '') {
              result += ', ';
            }
            result += eventsData.participants[index];
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
    transactionListElement.innerHTM += '</ul>'

});
  