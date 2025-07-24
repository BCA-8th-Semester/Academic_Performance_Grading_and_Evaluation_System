import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Search, SlidersHorizontal } from "lucide-react";
import { Routes, Route } from "react-router-dom";

const teachersData = [
  {
    name: "Abinash Shrestha",
    email: "abinashshrestha@gmail.com",
    role: "Teachers",
    lastLogin: "2025-06-20, 09:15 PM",
  },
  // Add more teacher objects as needed
];

const Teachers = () => {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachersData.filter((teacher) =>
    teacher.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <header className="p-6 pb-2">
          <h1 className="text-xl font-semibold">Teachers</h1>
        </header>
        <main className="flex-1 p-6 pt-0">
          {/* Teachers Card */}
          <div className="flex items-center gap-8 mb-6">
            <div className="border rounded-md px-8 py-4 flex flex-col items-center bg-white shadow">
              <span className="text-lg font-semibold">Teachers</span>
              <span className="text-2xl font-bold mt-1">{teachersData.length}</span>
            </div>
          </div>
          {/* Search */}
          <div className="mb-4 flex items-center">
            <div className="relative w-full">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="w-full border rounded px-10 py-2 focus:outline-none"
                placeholder="Search by email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 text-left font-medium">Name</th>
                  <th className="py-2 px-4 text-left font-medium">Email</th>
                  <th className="py-2 px-4 text-left font-medium">Roles</th>
                  <th className="py-2 px-4 text-left font-medium">Last Login</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No teachers found.
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map((teacher, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-2 px-4">{teacher.name}</td>
                      <td className="py-2 px-4">{teacher.email}</td>
                      <td className="py-2 px-4">{teacher.role}</td>
                      <td className="py-2 px-4">{teacher.lastLogin}</td>
                      <td className="py-2 px-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <SlidersHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};


export default Teachers;