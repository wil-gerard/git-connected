// import "./Login.css";
import logo from "../../images/logo.svg";
import twitterLogo from "../../images/twitter.svg";
import googleLogo from "../../images/google.svg";
import facebookLogo from "../../images/facebook.svg";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm rounded shadow-lg">
        <div className="px-6 py-4 flex-col flex">
          <button className="rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3 border-blue-darkest hover:bg-blue-darker focus:ring-blue-darker">Login</button>
          <button className="rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3 border-blue-darkest hover:bg-blue-darker focus:ring-blue-darker">Login</button>
          <button className="rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3 border-blue-darkest hover:bg-blue-darker focus:ring-blue-darker">Login</button>
        </div>
      </div>
    </div>
  );
}
