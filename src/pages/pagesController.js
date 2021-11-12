import ComingSoon from "./ComingSoon/ComingSoon.jsx";
import Login from "./Login/Login.jsx";
import Settings from "./Settings/Settings.jsx";

export function getAllPages() {
  return [<ComingSoon />, <Login />, <Settings />];
}

export function getAllPagesWithRoutes() {
  return [
    <Route path="/" component={ComingSoon} />,
    <Route path="/login" component={Login} />,
    <Route path="/settings" component={Settings} />,
  ];
}
