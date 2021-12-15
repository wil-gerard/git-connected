import React, { useContext } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import { myContext } from './hooks/Context'

function App() {

  const userObject = useContext(myContext);
  console.log(userObject);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
      </Switch >
    </BrowserRouter>
  )
}

export default App;
