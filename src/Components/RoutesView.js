import React, { useContext } from "react";

import Home from "./Home/Home";
import Communities from "./Communities/Communities";
import Navbar from "../Common/Navbar/Navbar";
import AuthLogin from "../Common/Auth/AuthLogin";
import AuthRegister from "../Common/Auth/AuthRegister";
import ProtectedRoute from "../Common/ProtectedRoute/ProtectedRoute";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { UserContext } from "../Context/userContext";

export default function RoutesView() {
  const { localUser } = useContext(UserContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          index
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<AuthLogin />}
        />
        <Route
          path="/register"
          element={<AuthRegister />}
        />
        <Route
          path="/communities"
          element={
            <ProtectedRoute user={localUser}>
              <Communities />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
