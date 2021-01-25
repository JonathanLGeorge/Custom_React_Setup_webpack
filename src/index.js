//contain code that inserts Reac App into our public index.html

import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Provider, provider } from "react-redux"; //adding redux
import { configureStore } from "./store"; //redux store
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
); //root is defined in public/index.html
