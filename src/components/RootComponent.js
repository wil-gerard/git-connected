import logo from '../images/logo.svg';
import './RootComponent.css';

function RootComponent() {
  return (
    <div className="RootComponent">
      <header className="RootComponent-header">
        <img src={logo} className="RootComponent-logo" alt="logo" />
        <p>
          GitToKnowEachOther
        </p>
        <p>
          Coming Soon!!
        </p>
      </header>
    </div>
  );
}

export default RootComponent;
