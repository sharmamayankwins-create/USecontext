import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Index from "./Layout/Index";

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-white/20"></div>
      
      <Index />
    </div>
  );
}

export default WelcomePage;