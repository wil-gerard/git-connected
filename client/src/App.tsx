import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Featured from "./pages/Featured"
import Context from './hooks/Context'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/featured" exact component={Featured} />
        <Context>
          <Route path="/profile" exact component={Profile} />
        </Context>
      </Switch >
    </BrowserRouter>
  )
}

export default App;
