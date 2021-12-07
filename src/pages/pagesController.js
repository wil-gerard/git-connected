import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComingSoon from "./ComingSoon/ComingSoon.jsx";
import Login from "./Login/Login.jsx";
import Profile from "./Profile/Profile.jsx";
import Settings from "./Settings/Settings.jsx";

export function getHomePage() {
  return <ComingSoon />;
}

export function getBrowserRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}
