import { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";
import Footer from "./Layout/Footer";
import Index from "./Layout/Index";



function WelcomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-[url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-white/20"></div>

    

      {/* Navbar
      <Header />

      // {/* Sidebar + Content */}
      {/* <Sidebar ///> */}

      {/* Footer */}
      {/* <Footer /> */} 

      <Index />
    </div>
  );
}

export default WelcomePage;
