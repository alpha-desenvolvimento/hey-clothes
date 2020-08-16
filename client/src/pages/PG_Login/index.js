import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";


import CMP_loginForm from "../../components/form/login";

class PG_Login extends React.Component {
  loginHandler() {
    console.log(123);
  }
  render() {
    return (
      <>
        <header>
          <h1>LOGIN PAGE</h1>
         
        </header>
        <div>
          <CMP_loginForm />
        </div>
      </>
    );
  }
}

export default PG_Login;
