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
