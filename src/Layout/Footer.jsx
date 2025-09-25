import { useState } from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <>
   <footer className="relative mt-100 bg-white/40 backdrop-blur-sm border-t border-gray-200 shadow-inner ">
        <div className="max-w-7xl  mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p>We create modern, responsive websites with React, Tailwind, and Ant Design.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link to="/help" className="hover:text-indigo-600">Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-indigo-600">🌐</a>
              <a href="#" className="hover:text-indigo-600">🐦</a>
              <a href="#" className="hover:text-indigo-600">📸</a>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm py-4 border-t border-gray-200">
          &copy; 2025 MyWebsite | All Rights Reserved
        </p>
      </footer>
   </>
  )
}

export default Footer
