import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, SlidersHorizontal, MoreVertical, UserPlus, Upload, X, Mail, User, Shield } from "lucide-react";
import Sidebar from "./Sidebar";
import { auth } from "../firebase";

const adminsData = [
  {
    name: "Abinash Shrestha (Admin)",
    email: "abinash.shrestha@sumsnepal.com",
    role: "Admin",
    lastLogin: "2025-07-08, 15:03",
    avatar: "https://ui-avatars.com/api/?name=Abinash+Shrestha",
  },
  {
    name: "Entrepreneur Advisory",
    email: "admin@sumsnepal.com",
    role: "Admin",
    lastLogin: "2025-02-11, 12:17",
    avatar: "https://ui-avatars.com/api/?name=Entrepreneur+Advisory",
  },
];

const instructorsData = [
  {
    name: "Instructor Example",
    email: "instructor@example.com",
    role: "Instructor",
    lastLogin: "2025-07-08, 12:00",
    avatar: "https://ui-avatars.com/api/?name=Instructor+Example",
  },
];

const learnersData = [
  {
    name: "Learner Example",
    email: "learner@example.com",
    role: "Learner",
    lastLogin: "2025-07-08, 10:00",
    avatar: "https://ui-avatars.com/api/?name=Learner+Example",
  },
];

const userTabs = [
  { label: "Admins", count: adminsData.length },
  { label: "Instructors", count: instructorsData.length },
  { label: "Learners", count: learnersData.length },
];

const roleOptions = [
  { label: "Learner", value: "Learner", icon: <User className="w-6 h-6 mx-auto text-blue-500" /> },
  { label: "Instructor", value: "Instructor", icon: <Shield className="w-6 h-6 mx-auto text-blue-500" /> },
  { label: "Admin", value: "Admin", icon: <UserPlus className="w-6 h-6 mx-auto text-blue-500" /> },
];

const ManageUser = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const user = auth.currentUser;

  let userData = [];
  if (activeTab === 0) userData = adminsData;
  if (activeTab === 1) userData = instructorsData;
  if (activeTab === 2) userData = learnersData;

  const filteredUsers = userData.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Invite User Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Learner");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Responsive Toggle Menu State
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const menuRefs = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openMenuIdx !== null &&
        menuRefs.current[openMenuIdx] &&
        !menuRefs.current[openMenuIdx].contains(event.target)
      ) {
        setOpenMenuIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuIdx]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    setInviteError("");
    setInviteSuccess("");
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send invite");
      setInviteSuccess("Invitation sent successfully!");
      setInviteEmail("");
      setInviteRole("Learner");
    } catch (err) {
      setInviteError(err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setOpenMenuIdx(null);
  };

  const handleDelete = (userEmail) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${userEmail}?`);
    if (confirmDelete) {
      // Perform delete logic here (e.g., API call)
      console.log(`Deleted user with email: ${userEmail}`);
    }
    setOpenMenuIdx(null);
  };

  return (
    <div style={{ display: "flex" }} className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col ml-64">
        <main className="flex-1 p-8">
          <div className="flex items-center px-8 pt-6 pb-2">
            <button className="flex items-center text-gray-500 hover:text-blue-600 font-medium">
              <ChevronLeft size={22} className="mr-1" />
              Back
            </button>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-8 px-8 pt-2">
            {userTabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                  activeTab === idx
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-400"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {tab.label}
                <span className="text-xs bg-gray-200 rounded px-2 py-0.5 font-semibold">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          {/* Search and Actions */}
          <div className="flex items-center gap-4 px-8 mt-6 mb-2">
            <input
              type="text"
              className="flex-1 border rounded px-4 py-2 focus:outline-none"
              placeholder="Search user by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus size={18} className="mr-2" />
              Invite User
            </button>
            <button className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition">
              <Upload size={18} className="mr-2" />
              Upload .csv file
            </button>
          </div>
          {/* Table */}
          <div className="px-8 pb-8">
            <table className="min-w-full bg-white rounded shadow mt-2">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 text-left font-medium">Name</th>
                  <th className="py-2 px-4 text-left font-medium">Email</th>
                  <th className="py-2 px-4 text-left font-medium">Roles</th>
                  <th className="py-2 px-4 text-left font-medium">Last login</th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-2 px-4 flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border" />
                        <span>{user.name}</span>
                      </td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2 px-4">{user.lastLogin}</td>
                      <td className="py-2 px-4 text-right relative">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          aria-label="Open menu"
                          onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                          ref={el => (menuRefs.current[idx] = el)}
                        >
                          <MoreVertical size={20} />
                        </button>
                        {openMenuIdx === idx && (
                          <div
                            ref={el => (menuRefs.current[idx] = el)}
                            className="absolute right-0 mt-2 min-w-[120px] bg-white border rounded shadow-lg z-10"
                          >
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                              onClick={() => handleEdit(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left"
                              onClick={() => handleDelete(user.email)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
        {/* Invite User Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowInviteModal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-6 text-center">Invite User</h2>
              <form onSubmit={handleInvite} className="space-y-5">
                <div>
                  <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <Mail className="w-5 h-5 text-blue-500 mr-2" />
                    <input
                      id="inviteEmail"
                      type="email"
                      className="flex-1 outline-none"
                      placeholder="Email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                      disabled={inviteLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
                  <div className="flex gap-3">
                    {roleOptions.map((role) => (
                      <button
                        type="button"
                        key={role.value}
                        className={`flex-1 flex flex-col items-center border rounded-lg px-4 py-3 transition ${
                          inviteRole === role.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 bg-white"
                        }`}
                        onClick={() => setInviteRole(role.value)}
                        disabled={inviteLoading}
                      >
                        {role.icon}
                        <span className={`mt-2 text-sm font-medium ${
                          inviteRole === role.value ? "text-blue-700" : "text-gray-700"
                        }`}>
                          {role.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {inviteError && (
                  <div className="text-red-600 text-sm">{inviteError}</div>
                )}
                {inviteSuccess && (
                  <div className="text-green-600 text-sm">{inviteSuccess}</div>
                )}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
                  disabled={inviteLoading}
                >
                  <UserPlus className="w-5 h-5" />
                  {inviteLoading ? "Inviting..." : "Invite User"}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                onClick={() => setShowEditModal(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold mb-6 text-center">Edit User</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="editName"
                    type="text"
                    className="w-full border rounded px-4 py-2 focus:outline-none"
                    defaultValue={selectedUser.name}
                  />
                </div>
                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="editEmail"
                    type="email"
                    className="w-full border rounded px-4 py-2 focus:outline-none"
                    defaultValue={selectedUser.email}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;