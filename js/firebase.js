const firebaseConfig = {
    apiKey: "AIzaSyDk8dFJAtLs14m9i-DaCW23SuhGlZz1X8I",
    authDomain: "pwa-g07.firebaseapp.com",
    projectId: "pwa-g07",
    storageBucket: "pwa-g07.appspot.com",
    messagingSenderId: "412146753821",
    appId: "1:412146753821:web:7b9368976e416db82781f4",
    measurementId: "G-CSDHV0SX4V"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


window.addEventListener("load", async (e) => {
    if ("serviceWorker" in navigator) {
      try {
        navigator.serviceWorker
          .register("./serviceWorker.js")
          .then((registration) => {
            console.log("SW correct registration");
            requestPermission(registration);
          });
      } catch (error) {
        console.log("SW failed registration ", error);
      }
    }
});
  
function requestPermission(serviceWorkerRegistration) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
        console.log("Notification permission granted.");
        messaging.getToken({vapidKey: 
            'BNin3mv-8Cj3wA6u9WWSXs9dJmyfy4wJnc4L1_Ex87R7JM92pX7slF3YPRNFdZ903Y60hcjtwCKVs_EUtXRXc4Y',
            serviceWorkerRegistration: serviceWorkerRegistration 
        }).then((currentToken) => {
            if (currentToken) {
                console.log("Token: ", currentToken);
            } else {
            console.log('No registration token available. Request permission to generate one.');
            }
        }).catch((error) => {
            console.log("An error occurred while retrieving token: ", error);
        });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

messaging.onMessage((payload) => {
  console.log('Message received: ', payload);
  const notification = payload.notification;
  const notificationOptions = {
    body: notification.body,
    icon: notification.icon,
  };
  M.toast({
    html: notification.title + '</br>' + notification.body,
    classes: 'rounded',
  });
});

