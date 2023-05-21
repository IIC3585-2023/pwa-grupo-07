export const events = [
  {
    uuid_evento: {
      name: 'nameTest',
      participants: { 0: 'Benja', 1: 'Fran', 2: 'JP'  },
      transactions: [
        {
          name: 'nameTest',
          ammount: 20,
          payer: 0,
          participants: [0, 1, 2],
          date: '2023-05-19'
        },
        {
          name: 'nameTest2',
          ammount: 40,
          payer: 1,
          participants: [0, 1],
          date: '2023-05-21'
        }
      ],
      totalSpending: 60,
      payments: { 0: 20, 1: 40, 2:0 }
    }
  }
]
