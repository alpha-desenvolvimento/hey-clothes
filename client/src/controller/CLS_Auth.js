// require("dotenv-safe").config();
import axios from "axios";

const itemName = "pxjwt";

function setToken(token) {
  localStorage.setItem(itemName, token);
}

class CLS_Auth {
  // static user(args = { user: null, pwd: null }) {
  static async user(args = { user: null, pwd: null }) {
    const { user, pwd } = args;

    if (user == null || pwd == null) {
      setToken(null);
      return false;
    }

    const url =
      process.env.NODE_ENV == undefined
        ? "http://localhost:5000/api/auth/user"
        : `/api/user`;

    // console.log("process.env");
    // console.log(process.env);

    console.log("url ", url);
    return await axios
      .post(url, { data: { user, pwd } })
      .then((response) => {
        const { auth, error, message, token } = response.data;

        if (auth && !error) {
          setToken(token);
          return true;
        } else {
          setToken(null);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        setToken(null);
        return false;
      });

    localStorage.setItem(itemName, 1);
  }
  static async token() {
    const token = localStorage.getItem(itemName);

    if (!token) return false;

    return true;
  }
}

export default CLS_Auth;
