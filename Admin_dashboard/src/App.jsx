import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./Routes/PublicRoute";
import MainRoute from "./Routes/MainRoute";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [ready, setReady] = useState(false); // wait until URL params processed

  useEffect(() => {
    console.log(" App mounted on 5173");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");

    console.log(" URL params on 5173:", { token, role });

    if (token && role) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role.toLowerCase());
      setUserRole(role.toLowerCase());
      console.log(" Saved to localStorage:", { token, role: role.toLowerCase() });

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else {
      // fallback to existing localStorage
      setUserRole((localStorage.getItem("userRole") || "").toLowerCase());
    }

    setReady(true);
  }, []);

  if (!ready) return null; // wait until we know the role

  return (
    <Routes>
      <Route
        path="/"
        element={
          userRole === "admin" ? (
            <Navigate to="/admindashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<PublicRoute />} />
      <Route path="/*" element={<MainRoute />} />
    </Routes>
  );
}

export default App;
