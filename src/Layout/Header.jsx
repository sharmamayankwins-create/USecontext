import { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { currentUser, logout } = useUser();
    const navigate = useNavigate();

    const menuItems = [
        { key: "1", label: <Link to="/profile">View Profile</Link> },
        { key: "2", label: <span onClick={()=>{logout();navigate("/login")}}>Logout</span> },
    ];
    return (
        <>
            <nav className="relative flex items-center justify-between px-6 py-4 bg-white/40 backdrop-blur-sm shadow-md border-b border-gray-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" className="w-10 h-10" alt="" />

                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <li><Link to="/welcome" className="hover:text-indigo-600">Home</Link></li>
                    <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
                    <li><Link to="/services" className="hover:text-indigo-600">Services</Link></li>
                    <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
                </ul>

                <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                    <button className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
                        {currentUser?.fullName || "My Profile"} <DownOutlined />
                    </button>
                </Dropdown>
            </nav>

        </>
    )
}

export default Header
