import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/layout/navbar";
import Footer from "./layout/footer";
import HomePage from "./component";
import LoginUser from "./login/loginUser";
import CreateUser from "./users/createUser";
import Errors from "./component/404";
import About from "./component/about";
import UserHomePage from "./component/homepage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/customer-login"
          element={
            <LoginUser
              source_page={"Customer"}
              source_url={"/customer-sign-up"}
            />
          }
        />
        <Route
          path="/admin-login"
          element={
            <LoginUser source_page={"Admin"} source_url={"/admin-sign-up"} />
          }
        />
        <Route
          path="/customer-sign-up"
          element={
            <CreateUser
              source_page={"Customer"}
              source_url={"/customer-login"}
            />
          }
        />
        <Route
          path="/admin-sign-up"
          element={
            <CreateUser source_page={"Admin"} source_url={"/admin-login"} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path="*" element={<Errors />} />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}
export default App;
