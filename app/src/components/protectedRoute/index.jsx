import React from "react";

import { Navigate } from "react-router-dom";
function isAuthenticated() {
  const checkToken = (v) => v === "IAMj4Dv35Jn=?c=2i?W2vI1G5ts/IEknD1djcWNHyoPIgu7PSvrYs/1gwo.1337";
  const token = localStorage.getItem("token");

  return checkToken(token);
}
const ProtectedRoute = ({ children, redirectTo }) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
};
export default ProtectedRoute;
export { isAuthenticated };
