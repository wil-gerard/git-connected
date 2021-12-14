import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Home from "./pages/Home"


function App() {
  return (
    <BrowserRouter>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
    </BrowserRouter>
  )
}

export default App;
