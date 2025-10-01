import React from "react";
import { Routes, Route } from "react-router-dom";
import Wrapper from "./Wrapper";
import Signup from "../Signup";
import Login from "../Login";
import Profile from "../Profile";
import Webpage from "../Webpage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Wrapper />}>
      <Route index element={<Webpage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Profile />} />
      <Route path="Webpage" element={<Webpage />} />
    </Route>
  </Routes>
);

export default AppRoutes;