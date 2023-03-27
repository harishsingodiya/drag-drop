const version = process.env.REACT_APP_DB_VERSION;
let request;
let db;
const dbName = process.env.REACT_APP_DB_NAME;
const storeName = process.env.REACT_APP_STORE_NAME;

/***
 * adding data in database
 */
export const addData = (data) => {
  return new Promise((resolve) => {
    const dataToBeStore = { id: 0, data };
    request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      store.add(dataToBeStore);
      resolve(dataToBeStore.data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

/***
 * getting data from database
 */
export const getStoreData = () => {
  return new Promise((resolve) => {
    request = indexedDB.open(dbName);

    request.onsuccess = function (event) {
      var db = event.target.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

/***
 * updating data into database
 */
export const updateData = (data) => {
  return new Promise((resolve) => {
    const dataToBeStore = { id: 0, data };
    request = indexedDB.open(dbName, version);

    request.onsuccess = () => {
      db = request.result;
      const objectStore = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName);
      const objectStoreRequest = objectStore.get(0);
      objectStoreRequest.onsuccess = () => {
        // Grab the data object returned as the result
        const data = objectStoreRequest.result;

        // Update the data in the object
        data.data = dataToBeStore;

        // Create another request that inserts the item back into the database
        const updateRequest = objectStore.put(data);
        // When this new request succeeds, run the displayData() function again to update the display
        updateRequest.onsuccess = () => {
          resolve(dataToBeStore.data);
        };
      };
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

/***
 * Checking data if exist or not in data,
 * if not exist then stores the default data
 */
export const initialDataLoad = async (data) => {
  const existingData = await getStoreData();
  if (!existingData?.length) {
    const res = await addData({ id: 0, data });
    if (res.data.length) {
      window.location.reload(true);
    }
  }
};

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/***
 * a little function to check data changes
 */
export const checkForDataChanged = (originalDataList, changedDataList) => {
  for (let i = 0; i < originalDataList.length; i++) {
    if (originalDataList[i].position !== changedDataList[i].position) {
      return true;
    }
  }

  return false;
};
