import Sidebar from "@/shared/components/Sidebar";
import { verifySession } from "@/shared/libs/session";
import React, { type ReactNode } from "react";

export default async function ManagerLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	const session = await verifySession("MANAGER");

	return (
		<div id="main-container" className="flex flex-1">
			<Sidebar />
			{children}
		</div>
	);
}
