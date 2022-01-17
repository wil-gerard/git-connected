import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/featured" element={<Featured />} />
            <Route path="/profile" element={<Profile />} />
          </Routes >
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;
