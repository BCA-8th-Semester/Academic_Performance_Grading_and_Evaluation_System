
import React from 'react';
import { Home, Users, BookOpen, User, Calendar, Bell } from 'lucide-react';

const DashboardSidebar = () => {
  const sidebarItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Users, label: 'Contact' },
    { icon: BookOpen, label: 'User' },
    { icon: User, label: 'Library' },
    { icon: Calendar, label: 'Admin' },
    { icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <User className="text-gray-800" size={16} />
          </div>
          <div>
            <div className="text-sm font-medium">Anush Shrestha</div>
            <div className="text-xs text-gray-400">Admin</div>
          </div>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-3 py-2 rounded cursor-pointer transition-colors ${
                item.active ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-center text-gray-400 text-xs">
          GuideBD
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
