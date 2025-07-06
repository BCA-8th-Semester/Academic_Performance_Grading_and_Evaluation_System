import React, { useState } from 'react';
import { Home, Users, BookOpen, Award, Settings, BarChart3, Calendar, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // Add this line
  const navigate = useNavigate();
  const user = auth.currentUser;

  const menuItems = [
    { icon: Home, label: 'Home', route: '/', active: true },
    // { icon: Users, label: 'Students', count: '120', route: '/students' },
    { icon: BookOpen, label: 'Courses', count: '15', route: '/courses' },
    // { icon: Award, label: 'Grades', route: '/grades' },
    // { icon: BarChart3, label: 'Analytics', route: '/analytics' },
    // { icon: Calendar, label: 'Schedule', route: '/schedule' },
    { icon: Users, label: 'User', route: '/user' },
    { icon: Menu, label: 'Admin Tools', route: '/Admin Tools' },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className={` text-black transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="relative">
              <div
                className="mt-2 flex items-center space-x-2 cursor-pointer"
                onClick={() => setUserDropdownOpen((open) => !open)}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'User')}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
                <div>
                  <div className="font-medium text-sm">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
              {userDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/profile');
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-slate-700 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.route}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-600 text-black hover:bg-blue-700 hover:text-white' 
                    : 'hover:bg-blue-600 text-black-500 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="ml-3">{item.label}</span>
                    {item.count && (
                      <span className="ml-auto bg-slate-600 text-xs px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
