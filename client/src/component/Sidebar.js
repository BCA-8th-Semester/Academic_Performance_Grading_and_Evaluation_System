import React, { useState } from 'react';
import { Home, Users, BookOpen, Award, Settings, BarChart3, Calendar, Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
import { auth } from '../firebase'; // Adjust path if needed
import './Sidebar.css'; // Optional: for styling

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', route: '/', active: true },
    { icon: Users, label: 'Students', count: '120', route: '/students' },
    { icon: BookOpen, label: 'Courses', count: '15', route: '/courses' },
    { icon: Award, label: 'Grades', route: '/grades' },
    { icon: BarChart3, label: 'Analytics', route: '/analytics' },
    { icon: Calendar, label: 'Schedule', route: '/schedule' },
    { icon: Settings, label: 'Settings', route: '/settings' },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className={` text-black transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-2xl font-bold text-blue-700">GradePro</h1>}
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
          {/* Logout option */}
          <li>
            <button
              // onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 rounded-lg transition-colors hover:bg-blue-600 text-black-500 hover:text-red-500"
              style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
