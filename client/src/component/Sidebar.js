import React, { useState } from 'react';
import { Home, Users, BookOpen, Menu, X, ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // For user menu dropdown
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const menuItems = [
    { icon: Home, label: 'Dashboard', route: '/dashboard' },
    { icon: BookOpen, label: 'Courses', route: '/courses', count: '15' },
    {
      icon: Users,
      label: 'User',
      dropdown: true,
      options: [
        { label: 'Admin', route: '/user/admins' },      // <-- This route
        { label: 'Teachers', route: '/user/teachers' },
        { label: 'Students', route: '/user/students' },
      ],
    },
    { icon: Menu, label: 'Admin Tools', route: '/admin-tools' },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 flex flex-col text-black transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      style={{ minHeight: '100vh' }}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="relative">
              <div
                className="mt-2 flex items-center space-x-2 cursor-pointer"
                onClick={() => setProfileDropdownOpen((open) => !open)}
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
                <ChevronDown size={18} className="ml-1 text-gray-500" />
              </div>
              {/* Profile Dropdown
              {profileDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-30 animate-fade-in">
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/profile');
                    }}
                  >
                    <UserIcon size={18} className="mr-2 text-blue-600" />
                    <span className="font-medium">Profile</span>
                  </button>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-blue-100 text-gray-700 transition-colors"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/settings');
                    }}
                  >
                    <Menu size={18} className="mr-2 text-gray-500" />
                    <span className="font-medium">Settings</span>
                  </button>
                  <div className="border-t my-1" />
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="mr-2" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )} */}
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

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                      location.pathname.startsWith('/user')
                        ? 'bg-blue-600 text-white font-semibold shadow'
                        : 'hover:bg-blue-100 text-black'
                    }`}
                    onClick={() => setUserMenuOpen((open) => (open === index ? null : index))}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && (
                      <>
                        <span className="ml-3">{item.label}</span>
                        <ChevronDown size={16} className="ml-auto" />
                      </>
                    )}
                  </button>
                  {userMenuOpen === index && !isCollapsed && (
                    <ul className="ml-8 mt-1 bg-white border rounded shadow z-20">
                      {item.options.map((opt, i) => (
                        <li key={i}>
                          <Link
                            to={opt.route}
                            className={`block px-4 py-2 text-sm hover:bg-blue-100 ${
                              location.pathname === opt.route ? 'bg-blue-100 font-semibold' : ''
                            }`}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {opt.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.route}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.route
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'hover:bg-blue-100 text-black'
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
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button at the bottom, always fixed */}
      <div className="p-4 border-t border-slate-200">
        <button
          className="flex items-center w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
