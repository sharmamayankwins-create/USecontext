import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, logout } from './Store/ userSlice';
import Index from "./Pages/Profile/Index";
 
function Profile() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(null);
 
  // Populate form from currentUser
  useEffect(() => {
    if (!currentUser) {
      message.error("No user logged in");
      navigate("/login");
      return;
    }
    form.setFieldsValue(currentUser);
    setProfileImage(currentUser.profileImage || null);
  }, [currentUser, form, navigate]);
 
  // Convert file to base64 for image upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
 
  const handleImageUpload = async (info) => {
    const { file } = info;
 
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }
 
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
 
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
      return false;
    }
 
    try {
      const base64 = await getBase64(file);
      setProfileImage(base64);
      message.success("Image uploaded successfully!");
    } catch {
      message.error("Failed to upload image");
    }
 
    return false; // prevent default upload
  };
 
  const handleUpdate = async () => {
    const values = form.getFieldsValue();
    try {
      await dispatch(updateUserData({ 
        id: currentUser.id, 
        data: { ...currentUser, ...values, profileImage } 
      })).unwrap();
      message.success("Profile updated successfully 🚀");
    } catch {
      message.error("Failed to update profile");
    }
  };
 
  const handleCancel = () => {
    navigate(-1);
  };
 
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
 
  if (!currentUser) return null;
 
  return (
    <div className="min-h-screen flex flex-col bg-[url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-white/20"></div>
 
      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 py-4 bg-white/40 backdrop-blur-sm shadow-md border-b border-gray-200">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="logo" className="w-10 h-10" />
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="/webpage" className="hover:text-indigo-600">Home</a></li>
          <li><a href="#" className="hover:text-indigo-600">About</a></li>
          <li><a href="#" className="hover:text-indigo-600">Services</a></li>
          <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
        </ul>
        <div>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-indigo-600"
          >
            Logout
          </button>
        </div>
      </nav>
 
      {/* Sidebar + Content */}
      <div className="relative flex flex-1">
        <aside className="w-56 bg-white/40 backdrop-blur-sm border-r border-gray-200 shadow-md">
          <ul className="p-6 space-y-4 font-medium text-gray-700">
            <li><a href="/webpage" className="hover:text-indigo-600">Home</a></li>
            <li><a href="#" className="hover:text-indigo-600">About</a></li>
            <li><a href="#" className="hover:text-indigo-600">Services</a></li>
            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
          </ul>
        </aside>

        <Index/>
      </div>
 
      {/* Footer */}
      <footer className="relative bg-white/40 backdrop-blur-sm border-t border-gray-200 shadow-inner mt-8">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p>We create modern, responsive websites with React, Tailwind CSS, and Ant Design.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Help</a></li>
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
    </div>
  );
}
 
export default Profile;