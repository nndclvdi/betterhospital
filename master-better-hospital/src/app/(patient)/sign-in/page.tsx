import SignInForm from "@/features/patient/auth/components/SignInForm";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Better Hospital - Sign In",
};

export default function SignInPage() {
	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<div className="flex flex-col w-full pt-[60px] p-5 bg-white gap-2">
					<p className="font-semibold text-2xl capitalize">Welcome Back! 🙌</p>
					<p className="font-medium text-monday-gray leading-none">
						Hop into your account to continue!
					</p>
				</div>
				<SignInForm />
			</div>
		</div>
	);
}
