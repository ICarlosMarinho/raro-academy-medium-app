import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserProvider from "./states/UserProvider";
import RequestProvider from "./states/RequestProvider";

ReactDOM.render(
  <RequestProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </RequestProvider>,
  document.getElementById("root")
);
