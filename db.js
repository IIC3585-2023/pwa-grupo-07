export function createDb(){
  const request = indexedDB.open('db', 1);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;
  
    const eventosStore = db.createObjectStore('events', { keyPath: 'uuid_event' });
  
    eventosStore.createIndex('id', 'uuid_event');
    console.log('db_created')
  };
} 

export function getEvent(eventId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('db', 1);

    request.onsuccess = function(event) {
      const db = event.target.result;

      const transaction = db.transaction('events', 'readwrite');
      const eventsStore = transaction.objectStore('events');

      const index = eventsStore.index('id');
      const query = index.getAll(eventId);

      query.onsuccess = function(event) {
        const results = event.target.result;
        console.log('Resultados de la consulta:', results);
        resolve(results);
      };

      transaction.onerror = function(error) {
        console.error('Error en la transacción:', error);
        reject(error);
      };
    };

    request.onerror = function(error) {
      console.error('Error al abrir la base de datos:', error);
      reject(error);
    };
  });
}

export function addEvent(newEvent){
  const request = indexedDB.open('db', 1);

  request.onsuccess = function(event) {
    const db = event.target.result;
  
    const transaction = db.transaction('events', 'readwrite');
    const eventsStore = transaction.objectStore('events');
    const addRequest = eventsStore.add(newEvent);
  
    addRequest.onsuccess = function(event) {
      console.log('Evento agregado correctamente.');
    };
  
    transaction.oncomplete = function() {
      console.log('Transacción completada.');
    };
  
    transaction.onerror = function(error) {
      console.error('Error en la transacción:', error);
    };
  };
}

export function addEventTransaction(eventId, newTransaction) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('db', 1);

    request.onsuccess = function(event) {
      const db = event.target.result;

      const transaction = db.transaction('events', 'readwrite');
      const eventsStore = transaction.objectStore('events');

      const getRequest = eventsStore.get(eventId);

      getRequest.onsuccess = function(event) {
        const eventData = event.target.result;

        if (eventData) {
          eventData.transactions = eventData.transactions;
          eventData.transactions.push(newTransaction)
          eventData.totalSpending += newTransaction.ammount 
          eventData.payments[newTransaction.payer] += newTransaction.ammount 

          const updateRequest = eventsStore.put(eventData);

          updateRequest.onsuccess = function(event) {
            console.log('Transacción actualizada correctamente.');
            resolve();
          };

          updateRequest.onerror = function(error) {
            console.error('Error al actualizar la transacción:', error);
            reject(error);
          };
        } else {
          console.error('No se encontró el evento con el ID especificado.');
          reject(new Error('No se encontró el evento con el ID especificado.'));
        }
      };

      transaction.onerror = function(error) {
        console.error('Error en la transacción:', error);
        reject(error);
      };
    };

    request.onerror = function(error) {
      console.error('Error al abrir la base de datos:', error);
      reject(error);
    };
  });
}

