export const payments = (event) => {
  const payments = {};

  const balances = getBalances(event);
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
    if (payments[j] === undefined) {
      payments[j] = {};
    }
    payments[j][i] = payment;
    iter++;
  }
  return payments;
};

export const getBalances = (event) => {
  const balances = [];
  for (let participant in event.participants) {
    balances[participant] = 0;
  }
  for (let transaction of event.transactions) {
    balances[transaction.payer] += transaction.ammount;
    for (let participant of transaction.participants) {
      balances[participant] -=
        transaction.ammount / transaction.participants.length;
    }
  }
  return balances;
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
