import { useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser } = useSelector(state => state.user);

  return (
    <div>
      <div className="relative flex flex-1">
        {sidebarOpen && (
          <aside className="w-56 bg-white/40 backdrop-blur-sm border-r border-gray-200 shadow-md">
            <ul className="p-6 space-y-4 font-medium text-gray-700">
              <li><Link to="/welcome" className="hover:text-indigo-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
              <li><Link to="/services" className="hover:text-indigo-600">Services</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
            </ul>
          </aside>
        )}

        <main className="flex-1 p-8 bg-transparent">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Welcome {currentUser?.fullName || "Guest"}
            </h1>
            <p className="text-gray-700">
              This is your dashboard. You can explore your profile, edit details,
              or navigate using the sidebar.
            </p>
          </div>

          <div className="mt-4">
            <Button
              type="primary"
              className="bg-indigo-500 hover:bg-indigo-600 shadow-md hover:shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "<" : "> "}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;