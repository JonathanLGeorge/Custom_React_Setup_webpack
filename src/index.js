//contain code that inserts Reac App into our public index.html

import React from "react";
import ReactDOM from "react-dom";
//added affter installing redux-presist
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
//
import { Provider, provider } from "react-redux"; //adding redux
import { configureStore } from "./store"; //redux store
import App from "./App.js";

const store = configureStore();
const persistor = persistStore(store);

/*
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
); //root is defined in public/index.html
*/
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
