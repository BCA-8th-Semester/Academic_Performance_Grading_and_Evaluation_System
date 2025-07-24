import React, { useState } from 'react';
import { Users, Menu, X, ChevronDown, LogOut, User, LayoutDashboard, GraduationCap, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


const Sidebar = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // For user menu dropdown
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = onLogout || (async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  });

  // Get user info from localStorage or Firebase auth
  const getLoggedInUser = () => {
    const loggedInUserName = localStorage.getItem('loggedInUser');
    return {
      name: loggedInUserName || user?.displayName || user?.email?.split('@')[0] || 'User',
       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(loggedInUserName || user?.displayName || user?.email || 'User')}&background=3b82f6&color=ffffff`
    };
  };  

  const currentUser = getLoggedInUser();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
    { icon: GraduationCap, label: 'Courses', route: '/courses', count: '8' }, // Updated to match the actual course count from StatsCards
    {
      icon: Users,
      label: 'User',
      dropdown: true,
      options: [
        { label: 'Admin', route: '/user/admins' },
        { label: 'Teachers', route: '/user/teachers' },
        { label: 'Students', route: '/user/students' },
      ],
    },
    { icon: Shield, label: 'Admin Tools', route: '/admin-tools' },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 flex flex-col text-black transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} style={{ minHeight: '100vh' }}>
      <div className="p-4 border-b border-slate-200 relative">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="mt-2 flex items-center space-x-2 cursor-pointer" onClick={() => setProfileDropdownOpen((open) => !open)}>
              <img 
                src={currentUser.avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-blue-200" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-800 truncate">
                  {currentUser.name}
                </div>
              
              </div>
              <ChevronDown size={18} className="ml-1 text-gray-500" />
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 rounded hover:bg-gray-100 transition-colors">
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        {/* Profile Dropdown */}
        {profileDropdownOpen && !isCollapsed && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img 
                  src={currentUser.avatar} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-blue-200" 
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-800 truncate">
                    {currentUser.name}
                  </div>
                
                </div>
              </div>
            </div>
            <div className="p-2">
              <button 
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  // Add profile edit functionality here
                }}
              >
                <User size={16} className="mr-2" />
                View Profile
              </button>
              <button 
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  handleLogout();
                }}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              {item.dropdown ? (
                <>
                  <button className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${location.pathname.startsWith('/user') ? 'bg-blue-600 text-white font-semibold shadow' : 'hover:bg-blue-100 text-black'}`} onClick={() => setUserMenuOpen((open) => (open === index ? null : index))}>
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
                          <Link to={opt.route} className={`block px-4 py-2 text-sm hover:bg-blue-100 ${location.pathname === opt.route ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => setUserMenuOpen(false)}>
                            {opt.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link to={item.route} className={`flex items-center px-3 py-2 rounded-lg transition-colors ${location.pathname === item.route ? 'bg-blue-600 text-white font-semibold shadow' : 'hover:bg-blue-100 text-black'}`}>
                  <item.icon size={20} />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3">{item.label}</span>
                      {item.count && (
                        <span className="ml-auto bg-slate-600 text-xs px-2 py-1 rounded-full">{item.count}</span>
                      )}
                    </>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {/* <div className="p-4 border-t border-slate-200">
        <button className="flex items-center w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors" style={{ minHeight: '48px' }} onClick={handleLogout}>
          <LogOut size={18} className="mr-2" />
          {!isCollapsed && 'Logout'}
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
