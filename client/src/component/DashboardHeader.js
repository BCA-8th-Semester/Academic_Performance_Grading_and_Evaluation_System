import React from 'react';
import { Search } from 'lucide-react';

// Accept a "title" prop to update the header name dynamically
const DashboardHeader = ({ user, title = "Home" }) => (
  <header className="flex items-center justify-between px-6 py-4 rounded-lg mb-6">
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {/* <p className="text-sm text-gray-500">{user?.email}</p> */}
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="pl-20 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
      {/* <div className="flex items-center space-x-2">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.displayName || 'User'}`}
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
        <div className="hidden md:block">
          <div className="font-medium">{user?.displayName || 'User'}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
      </div> */}
    </div>
  </header>
);

export default DashboardHeader;