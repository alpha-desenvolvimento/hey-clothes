import React from "react";
import { Route, BrowserRouter, useHistory } from "react-router-dom";

import PG_Mock from "./pages/PG_Mock";

function App() {
  const history = useHistory();

  return (
    <BrowserRouter>
      <Route path="/" exact component={() => <PG_Mock text={`Home page`} />} />
      <Route path="/login" exact component={() => <PG_Mock text={`Login page`} />} />
      {/* <Route component={PanelLogin} path="/login" exact /> */}
    </BrowserRouter>
  );
}

export default App;

// import "./App.scss";
// import { AuthProvider, AuthContext } from "@ryanar/react-auth-provider";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// import "bootstrap";

///////////////////////

// const handleLogin = () => {
//   history.push("/");
// };

// const handleLogout = () => {
//   history.push("/login");
// };

// function Login(RouteComponentProps) {
//   const { setAuthenticated } = React.useContext(AuthContext);
//   return (
//     <button type="button" onClick={() => setAuthenticated(true)}>
//       Login
//     </button>
//   );
// }

// function AuthRoute(RouteComponentProps) {
//   const { authenticated } = React.useContext(AuthContext);

//   if (!authenticated) {
//     return history.push("/");
//   }

//   const { Component, ...rest } = props;

//   return <Component {...rest} />;
// }
