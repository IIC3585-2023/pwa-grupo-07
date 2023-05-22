const events = {
  'NTkkphmuTThuhRk-bxD': {
    name: 'nameTest',
    participants: { 0: 'Benja', 1: 'Fran', 2: 'JP' },
    transactions: [
      {
        name: 'nameTest',
        ammount: 30,
        payer: 0,
        participants: [0, 1, 2],
        date: '2023-05-19',
      },
      {
        name: 'nameTest2',
        ammount: 20,
        payer: 1,
        participants: [0, 1],
        date: '2023-05-21',
      },
      {
        name: 'nameTest3',
        ammount: 20,
        payer: 1,
        participants: [2, 1],
        date: '2023-05-21',
      },
      {
        name: 'nameTest3',
        ammount: 20,
        payer: 1,
        participants: [2, 1],
        date: '2023-05-21',
      },
    ],
  },
};

// Given an event object create algorithm to calculate payments that minimize the number of transactions
//
// Input: event object
// Output: array of transactions
//
const payments = (event) => {
  const balances = [];
  const payments = {};
  for (let participant in event.participants) {
    balances[participant] = 0;
  }
  for (let transaction of event.transactions) {
    balances[transaction.payer] -= transaction.ammount;
    for (let participant of transaction.participants) {
      balances[participant] +=
        transaction.ammount / transaction.participants.length;
    }
  }
  // Sort balances
  balances.sort((a, b) => a - b);
  console.log(balances);
  // While there are balances to be paid
  let iter = 0;
  while (balancesToBePaid(balances) && iter < 1000) {
    // Find the biggest negative balance
    let i = 0;
    while (balances[i] >= 0 && i < balances.length) {
      i++;
    }
    // Find the biggest positive balance
    let j = balances.length - 1;
    while (balances[j] <= 0 && j > 0) {
      j--;
    }
    // Calculate the payment
    const payment = Math.min(-balances[i], balances[j]);
    // Update balances
    balances[i] += payment;
    balances[j] -= payment;
    // Add payment to payments object
    if (payments[i] === undefined) {
      payments[i] = {};
    }
    payments[i][j] = payment;
    iter++;
  }
  return payments;
};

const balancesToBePaid = (balances) => {
  // If there are balances to be paid return true else return false
  for (let balance of balances) {
    if (balance !== 0) {
      return true;
    }
  }
  return false;
};
