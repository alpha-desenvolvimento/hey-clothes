import React from "react";

import CLS_Auth from "../../../controller/CLS_Auth";

class CMP_loginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "e@mail.com",
      pwd: "123456",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }
  async handleSubmit(event) {
    event.preventDefault();

    if (await CLS_Auth.user({ ...this.state })) {
      alert("usuário existe! :D");
    } else {
      alert("usuário não exist! :(");
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          E-Mail
          <input
            type="email"
            id="email"
            name="user"
            value={this.state.user}
            onChange={this.handleInputChange}
            placeholder="meu@email.com"
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            id="password"
            name="pwd"
            value={this.state.pwd}
            onChange={this.handleInputChange}
            required
          />
        </label>

        <button>Acessar</button>
      </form>
    );
  }
}

export default CMP_loginForm;
