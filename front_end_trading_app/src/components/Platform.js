import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
//import BaseRouter from "./Routes";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Chart from "../pages/Chart";
import Company from "../pages/Company";
import Financials from "../pages/Financials";
// import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

class Platform extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/company" element={<Company />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/*" element={<PrivateRoute />} />
        </Routes>
        <PrivateRoute path="/profile" element={<Profile />} />
      </Router>
    );
  }
}

export default Platform;