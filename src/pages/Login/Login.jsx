import "./Login.css";
import logo from "../../images/logo.svg"
import twitterLogo from "../../images/twitter.svg"
import googleLogo from "../../images/google.svg"
import facebookLogo from "../../images/facebook.svg"

export default function Login() {
  return (
    <div className="Login">

      <img src={logo} className="logo" alt="logo" />
      <div className = "title">
        <p>Sign in</p>
      </div>
      <div className = "username">
        <p>Username</p>
      </div>
      <div className = "password">
        <p>Password</p>
      </div>
      <div className = "login-button">
        <p>Sign in</p>
      </div>
      <div className = "social-icons">
      <img src={twitterLogo} className="twitter-logo" alt="twitter logo" />
      <img src={googleLogo} className="google-logo" alt="google logo" />
      <img src={facebookLogo} className="facebook-logo" alt="facebook logo" />
      </div>


    </div>
  );
}
