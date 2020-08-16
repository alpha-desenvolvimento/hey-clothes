import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, useHistory } from "react-router-dom";


import PG_Mock from "./pages/PG_Mock";
import PG_Login from "./pages/PG_Login";
const rootEl = document.getElementById("root");

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <Route path="/" exact component={() => <PG_Mock text={`Home page`} />} />
      <Route path="/login" exact component={PG_Login} />
      {/* <Route component={PanelLogin} path="/login" exact /> */}
    </BrowserRouter>
  );
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl
);