# Welcome to Drag&Drop!

This project contains the features to drag and drop the items horizontally with auto saving feature to maintain the latest changes and you can also see the item description once you click on any of the items.


## Packages that we are used in this project

 
 - [Axios](https://www.npmjs.com/package/axios)
 - [MSW](https://mswjs.io/docs/getting-started/install)
 - [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
 -  [React-Bootstrap](https://react-bootstrap.github.io/getting-started/introduction)
 - [React-Beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

  ## React Hooks used:
 - useEffect
 - useState
 - useCallback

## Customized functions:

 - **initialDataLoad**: This function used to check for the existing data in the database on refresh of the page if data does not exist it loads default data from the JSON file otherwise it will return false.
 - **fetchData** : Its fetching data from the database.
 - **handleUpdateData**: This function is used to update the changes in the database.
 - **onDragEnd**: This function is used to handle the items when we drag and drop the items. it will reorder the items according to destination where we drop the item and its checking the list is changed or not if it changed then it's enable the change flag.
 
 ## Database configuration:
 We have integrated the **indexedDB** to store the data of this project. In the **src** folder we have **initDB** function under **server/index.js** directory. The **initDB** function used to create the database and the store where we will store the project data.  

## Mock Api Configurations:
We have implemented the **MSW** mock api services to mock the api. In **src** folder we have mocks folder where we configured the MSW mock api's. In the **handler.js** folder we have two api's **getData** and **putData** which used to add and updated the items in the database.

## Available Scripts to configure the project

  

In the project directory, you can run:

  

### `npm install`

  

This command will install all the npm packages which is used in this project.

  

### `npm start`

  

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

  

The page will reload when you make changes.\

  

### `npm run build`

  

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!
