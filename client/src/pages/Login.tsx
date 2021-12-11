// import logo from "../images/logo.svg";
import TwitterLogo from "../images/twitter.svg";
// import GoogleLogo from "../images/google.svg";
// import FacebookLogo from "../images/facebook.svg";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen text-gray">
      <div className="max-w-sm rounded shadow-lg">
        <div className="px-6 py-4 flex-col flex">
          <button className="rounded-lg text-sm px-5 py-2.5 text-left mr-3 mb-3 bg-blue-darker hover:bg-blue-darkerer ring-gray">
            
            Sign in with Twitter
            </button>
            <TwitterLogo/>
          <button className="rounded-lg text-sm px-5 py-2.5 text-left mr-3 mb-3 border-blue-darkest hover:bg-blue-darker focus:ring-blue-darker">Sign in with LinkedIn</button>
          <button className="rounded-lg text-sm px-5 py-2.5 text-left mr-3 mb-3 border-blue-darkest hover:bg-blue-darker focus:ring-blue-darker">Sign in with GitHub</button>
        </div>
      </div>
    </div>
  );
}
