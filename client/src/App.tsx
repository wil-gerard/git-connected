import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Featured from "./pages/Featured"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <div className="flex-grow">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/featured" exact component={Featured} />
            <Route path="/profile" exact component={Profile} />
            <Redirect to="/" />
          </Switch >
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
