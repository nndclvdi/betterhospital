import SignUpForm from "@/features/patient/auth/components/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Better Hospital - Sign Up",
};

export default function SignUpPage() {
	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<div className="flex flex-col w-full pt-[60px] p-5 bg-white gap-2">
					<p className="font-semibold text-2xl capitalize">
						Hey 🙌, Welcome aboard!
					</p>
					<p className="font-medium text-monday-gray leading-none">
						Create your account to continue!
					</p>
				</div>
				<SignUpForm />
			</div>
		</div>
	);
}
