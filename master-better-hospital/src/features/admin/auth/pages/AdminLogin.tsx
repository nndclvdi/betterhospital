"use client";

import React, { useActionState, useEffect } from "react";
import { loginAuth } from "../lib/actions/login";
import type { FormState } from "@/shared/types/formState";

const initialState: FormState = {
	success: false,
};

export default function AdminLoginPage() {
	const [state, formAction, pending] = useActionState(loginAuth, initialState);

	useEffect(() => {
		if (state.message) {
			alert(state.message);
		}
	}, [state]);

	return (
		<>
			<div className="absolute w-screen h-screen flex overflow-hidden">
				<img
					src="/assets/images/backgrounds/log-bg.png"
					className="w-full h-full top-0 object-contain object-top"
					alt="background"
				/>
			</div>
			<main className="relative flex flex-1 h-screen items-center">
				<div className="flex flex-1 items-center justify-center">
					<form
						action={formAction}
						className="flex flex-col w-[486px] shrink-0 rounded-3xl gap-8 p-6 bg-white"
					>
						<img
							src="/assets/images/logos/logo.svg"
							className="w-full h-[34px] mx-auto"
							alt="logo"
						/>
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2 text-center">
								<p className="font-semibold text-2xl">
									Hey there! 🙌🏻 Welcome back!
								</p>
								<p className="font-medium text-monday-gray">
									Access your account to continue
								</p>
							</div>
							<div className="flex flex-col gap-8 w-full">
								<label className="group relative">
									<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
										<img
											src="/assets/images/icons/sms-grey.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
									</div>
									<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
										Email Address
									</p>
									<input
										type="email"
										name="email"
										className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
										placeholder=""
									/>
								</label>
								<label className="group relative">
									<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
										<img
											src="/assets/images/icons/key-grey.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
									</div>
									<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
										Your password
									</p>
									<input
										id="passwordInput"
										type="password"
										name="password"
										className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 tracking-[0.3em]"
										placeholder=""
									/>
									<button
										id="togglePassword"
										type="button"
										className="absolute transform -translate-y-1/2 top-1/2 right-6"
									>
										<img
											src="/assets/images/icons/eye-grey.svg"
											className="flex size-6 shrink-0"
											alt="icon"
										/>
									</button>
								</label>
							</div>
							<button
								type="submit"
								disabled={pending}
								className="btn btn-primary w-full font-medium"
							>
								Sign In
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
