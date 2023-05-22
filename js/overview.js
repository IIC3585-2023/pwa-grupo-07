const events = [
  {
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
      ],
      totalSpending: 60,
      payments: { 0: 20, 1: 40, 2: 0 },
    },
  },
];

let currentEvent;
let currentUser;

function generateEventId() {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const queryParams = new URLSearchParams(window.location.search);

const eventId = queryParams.get('event');

if (queryParams.has('event')) {
  currentEvent = events.find((event) => {
    return Object.keys(event)[0] === eventId;
  });
}
