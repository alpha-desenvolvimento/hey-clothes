import React from "react";
import { useHistory, Link } from "react-router-dom";

import "./style.scss";

class PG_Mock extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>Mock page</h1>
          <h3>{this.props.text}</h3>
        </header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </>
    );
  }
}
export default PG_Mock;
