import UserInfo from "@/features/patient/discover/components/UserInfo";
import React, { type ReactNode, Suspense } from "react";
import BottomBar from "./BottomBar";

export default async function LayoutMobile({
	children,
}: { children: ReactNode }) {
	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<Suspense>
					<UserInfo />
				</Suspense>
				{children}
				<BottomBar />
			</div>
		</div>
	);
}
