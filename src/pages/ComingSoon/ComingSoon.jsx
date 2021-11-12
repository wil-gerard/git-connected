import "./ComingSoon.css";
import logo from '../../images/logo.svg';

export default function ComingSoon() {
  return (
    <div className="ComingSoon">
      <p className="coming-soon">Coming Soon!</p>
      <header className="ComingSoon-header">
        <img src={logo} className="ComingSoon-logo" alt="logo" />
        <p>GitToKnowEachOther</p>
      </header>
    </div>
  );
}