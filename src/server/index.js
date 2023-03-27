let request;
let db;
let version = process.env.REACT_APP_DB_VERSION;
const dbName = process.env.REACT_APP_DB_NAME;
const storeName = process.env.REACT_APP_STORE_NAME;

export const initDB = () => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open(dbName);
    
    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(storeName)) {
        console.log(`Creating ${dbName} store`);
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};