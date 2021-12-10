import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import ComingSoon from "./pages/ComingSoon"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={ComingSoon} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="*" component={ComingSoon} />
    </BrowserRouter>
  )
}

export default App;
