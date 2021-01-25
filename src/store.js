import { createStore, combineReducers } from "redux";
import { todos } from "./todos/reducers";

//this is where we put all our reducers we define
const reducers = { todos }; //hooking up our reducer to our redux store

//this puts our reducers into a form that we can pass to the create store fuction we imported
const rootReducer = combineReducers(reducers);

//we will import this inside out ./src/index.js
export const configureStore = () => createStore(rootReducer);
