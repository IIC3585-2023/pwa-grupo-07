export const events = [
  {
    uuid_evento: {
      name: 'nameTest',
      participants: { 0: 'participant1', 1: 'participant2' },
      transactions: {
        id: {
          name: 'nameTest',
          ammount: 2,
          payer: 0,
          participants: [0, 1],
          date: '2018-01-01'
        }
      },
      totalSpending: 20,
      payments: { 0: 20, 1: 0 }
    }
  }
]