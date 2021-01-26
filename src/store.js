import { createStore, combineReducers } from "redux";
//these are added after we installed redux-persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
//
import { todos } from "./todos/reducers";

//this is where we put all our reducers we define
const reducers = { todos }; //hooking up our reducer to our redux store

//how to save and where to store our aplications data
const persistConfig = {
  key: "root",
  storage, //we imported this property... it defaults to local storage on the web
  stateReconciler: autoMergeLevel2, //how to make sense of initial and stored states of our app... how deep should it go?
};

//this puts our reducers into a form that we can pass to the create store fuction we imported
const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

//we will import this inside out ./src/index.js
//export const configureStore = () => createStore(rootReducer);
//uppdated to
export const configureStore = () =>
  createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
/**
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

 is chrome browser extention for redux 
 */
