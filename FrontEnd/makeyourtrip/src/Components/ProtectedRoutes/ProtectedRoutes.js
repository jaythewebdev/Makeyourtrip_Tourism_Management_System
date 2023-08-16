import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  return !!token && userRole; // Return both token presence and user role
};

const ProtectedRoutes = ({ allowedRoles }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, check if the user's role is allowed for the protected route
  const isAuthorized = allowedRoles.includes(isAuth);

  if (!isAuthorized) {
    // If the user's role is not allowed for this protected route, redirect to the home page
    return <Navigate to="/page404" />;
  }

  // If the user is authenticated and authorized, render the protected route
  return <Outlet />;
};

export default ProtectedRoutes;