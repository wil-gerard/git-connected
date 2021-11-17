import "./ComingSoon.css";
import logo from "../../images/logo.svg";

export default function ComingSoon() {
  return (
    <div className="ComingSoon">
      <div className="top-banner">
        <p>Coming Soon!</p>
      </div>
      <header className="ComingSoon-header">
        <img src={logo} className="ComingSoon-logo" alt="logo" />
        <p>GitToKnowEachOther</p>
      </header>
    </div>
  );
}
