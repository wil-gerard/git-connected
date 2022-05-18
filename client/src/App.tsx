import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Profiles from './pages/Profiles';
import Featured from './pages/Featured';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserContextProvider from './hooks/UserContext';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/publicprofile/:id" element={<PublicProfile />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
