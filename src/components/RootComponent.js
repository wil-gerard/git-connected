import logo from '../images/logo.svg';
import './RootComponent.css';

function RootComponent() {
  return (
    <div className="RootComponent">
      <p class="coming-soon">Coming Soon!</p>
      <header className="RootComponent-header">
        <img src={logo} className="RootComponent-logo" alt="logo" />
        <p>
          GitToKnowEachOther
        </p>
      </header>
    </div>
  );
}

export default RootComponent;
