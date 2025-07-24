import React, { useEffect, useState } from "react";
import { Users, Presentation, Layers } from "lucide-react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const adminTools = [
	{
		icon: <Users size={40} className="mx-auto mb-2" />,
		title: "Manage User",
		description: "Add, edit, or remove users.",
		route: "/user/manage", // <-- Updated route to match ManageUser route in App.js
	},
	{
		icon: <Presentation size={40} className="mx-auto mb-2" />,
		title: "Manage Board",
		description: "Create and manage boards.",
		route: "/admin/manage-board", // <-- Updated route to match ManageBoard route in App.js
	},
	{
		icon: <Layers size={40} className="mx-auto mb-2" />,
		title: "Manage Framework",
		description: "Control and configure frameworks.",
		route: "/admin-tools/framework",
	},
];

const AdminTools = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(auth.currentUser);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((currentUser) => {
			if (!currentUser) {
				navigate("/");
			} else {
				setUser(currentUser);
			}
		});
		return () => unsubscribe();
	}, [navigate]);

	return (
		<div style={{ display: "flex" }} className="flex min-h-screen bg-gray-50">
			<Sidebar user={user} />
			<div className="flex-1 flex flex-col ml-64">
				<DashboardHeader user={user} title="Admin Tools" />
				<main className="flex-1 p-8">
					<div className="flex flex-wrap gap-8 justify-start">
						{adminTools.map((tool, idx) => (
							<div
								key={idx}
								className="w-64 h-48 bg-gray-200 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300 transition"
								onClick={() => navigate(tool.route)}
							>
								{tool.icon}
								<div className="text-center">
									<h3 className="font-semibold text-lg">{tool.title}</h3>
									<p className="text-gray-700 text-sm mt-2">
										{tool.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
};

export default AdminTools;