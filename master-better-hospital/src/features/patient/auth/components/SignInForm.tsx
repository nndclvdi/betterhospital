"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { signInSchema, type SignInValues } from "../helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignIn from "../hooks/useSignIn";
import { useRouter } from "next/navigation";
import { SIGN_UP_PAGE } from "@/shared/constants/uri-fe-page";

export default function SignInForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
	});

	const { mutateAsync, isPending } = useSignIn();

	const router = useRouter();

	const onSubmit = async (val: SignInValues) => {
		try {
			await mutateAsync(val);

			router.push("/home");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
			<div className="flex flex-col py-6 px-5 gap-8 bg-white mt-2 flex-1">
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Email Address</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/sms-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
								Type your email
							</p>
							<input
								type="email"
								className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
								placeholder=""
								{...register("email")}
							/>
						</label>
						{errors.email && (
							<span className="font-semibold text-sm text-monday-red  leading-none">
								{errors.email.message}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Password</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/key-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
								Type your Password
							</p>
							<input
								type="password"
								className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[1.5px] border-monday-border pl-20 pr-16 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black group-[&.invalid]/errorState:border-monday-red transition-300 tracking-[0.3em]"
								placeholder=""
								{...register("password")}
							/>
						</label>
						{errors.password && (
							<span className="font-semibold text-sm text-monday-red  leading-none">
								{errors.password.message}
							</span>
						)}
					</div>
					<Link
						href="#"
						className="text-right font-semibold text-sm text-monday-blue hover:underline"
					>
						Reset Password
					</Link>
				</div>
			</div>
			<div id="Bottom-Bar" className="flex relative w-full h-[138px] mt-2">
				<div className="fixed z-30 bottom-0 flex flex-col gap-3 w-full max-w-[640px] px-5 py-6 bg-white border-t border-monday-stroke">
					<button
						type="submit"
						disabled={isPending}
						className="flex items-center w-full h-[56px] justify-center gap-[6px] rounded-2xl py-4 px-6 bg-monday-blue"
					>
						<span className="font-semibold text-lg leading-none text-white">
							{isPending ? "Loading..." : "Sign In"}
						</span>
					</button>
					<p className="font-semibold text-sm capitalize text-center text-monday-gray">
						Doesn't have an account?{" "}
						<Link
							href={SIGN_UP_PAGE}
							className="text-monday-blue hover:underline"
						>
							Register Now
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
}
