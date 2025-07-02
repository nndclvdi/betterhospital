"use client";

import { SIGN_IN_PAGE } from "@/shared/constants/uri-fe-page";
import Link from "next/link";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpValues } from "../helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "../../../../../generated/prisma";
import useSignUp from "../hooks/useSignUp";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
	});

	const { mutateAsync, isPending } = useSignUp();

	const uploadRef = useRef<HTMLInputElement>(null);
	const photo = watch("photo");

	const router = useRouter();

	const onSubmit = async (val: SignUpValues) => {
		try {
			const formData = new FormData();

			for (const [key, value] of Object.entries(val)) {
				formData.append(key, value);
			}

			await mutateAsync(formData);

			router.push("/sign-in");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
			<div className="flex flex-col py-6 px-5 gap-8 bg-white mt-2 flex-1">
				<div className="flex items-center justify-between">
					<div className="group relative flex size-[100px] rounded-full overflow-hidden items-center justify-center bg-[#D7D7E417] border border-monday-stroke">
						<img
							id="Thumbnail"
							src={
								photo
									? URL.createObjectURL(photo)
									: "/assets/images/icons/profile-photo-default.svg"
							}
							className="size-full object-cover"
							alt="icon"
						/>
						<input
							type="file"
							id="File-Input"
							accept="image/*"
							className="absolute inset-0 opacity-0 cursor-pointer"
							ref={uploadRef}
							onChange={(e) => {
								if (e.target.files) {
									setValue("photo", e.target.files[0]);
								}
							}}
						/>
					</div>
					<button
						type="button"
						id="Add-Photo"
						className="btn btn-black w-fit font-medium text-sm text-nowrap gap-[6px] p-[14px] leading-none h-[46px]"
						onClick={() => uploadRef.current?.click()}
					>
						Change Image
						<img
							src="/assets/images/icons/receive-square-white.svg"
							className="flex size-4 shrink-0"
							alt="icon"
						/>
					</button>
				</div>
				{errors.photo && (
					<span className="font-semibold text-sm text-monday-red  leading-none">
						{errors.photo.message?.toString()}
					</span>
				)}
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Complete Name</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/user-thin-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
								Type your name
							</p>
							<input
								type="text"
								className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
								placeholder=""
								{...register("name")}
							/>
						</label>
						{errors.name && (
							<span className="font-semibold text-sm text-monday-red  leading-none">
								{errors.name.message}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Phone No.</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/call-calling-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[22px] group-has-[:placeholder-shown]:top-[33px] group-focus-within:top-[22px] transition-300">
								Type your phone
							</p>
							<input
								type="tel"
								className="appearance-none w-full h-[66px] font-semibold rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
								placeholder=""
								{...register("phone")}
							/>
						</label>
						{errors.phone && (
							<span className="font-semibold text-sm text-monday-red  leading-none">
								{errors.phone.message}
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Choose Gender</p>
					<div className="flex items-center gap-4 h-[56px]">
						<label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-2xl border-[2px] border-monday-border focus-within:border-monday-black has-[:checked]:border-monday-blue has-[:checked]:bg-monday-blue/10 transition-300 w-full">
							<div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border group-has-[:checked]:border-monday-blue">
								<div className="flex size-6 shrink-0 relative">
									<img
										src="/assets/images/icons/man-grey.svg"
										className="flex size-6 shrink-0 absolute opacity-100 group-has-[:checked]:opacity-0 transition-300"
										alt="icon"
									/>
									<img
										src="/assets/images/icons/man-blue.svg"
										className="flex size-6 shrink-0 absolute opacity-0 group-has-[:checked]:opacity-100 transition-300"
										alt="icon"
									/>
								</div>
							</div>
							<p className="font-semibold leading-none w-full text-monday-gray group-has-[:checked]:text-monday-blue">
								Male
							</p>
							<input
								type="radio"
								value={Gender.MALE}
								className="absolute opacity-0"
								{...register("gender")}
							/>
						</label>
						<label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-2xl border-[2px] border-monday-border focus-within:border-monday-black has-[:checked]:border-monday-blue has-[:checked]:bg-monday-blue/10 transition-300 w-full">
							<div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border group-has-[:checked]:border-monday-blue">
								<div className="flex size-6 shrink-0 relative">
									<img
										src="/assets/images/icons/woman-grey.svg"
										className="flex size-6 shrink-0 absolute opacity-100 group-has-[:checked]:opacity-0 transition-300"
										alt="icon"
									/>
									<img
										src="/assets/images/icons/woman-blue.svg"
										className="flex size-6 shrink-0 absolute opacity-0 group-has-[:checked]:opacity-100 transition-300"
										alt="icon"
									/>
								</div>
							</div>
							<p className="font-semibold leading-none w-full text-monday-gray group-has-[:checked]:text-monday-blue">
								Female
							</p>
							<input
								type="radio"
								value={Gender.FEMALE}
								className="absolute opacity-0"
								{...register("gender")}
							/>
						</label>
					</div>
					{errors.gender && (
						<span className="font-semibold text-sm text-monday-red  leading-none">
							{errors.gender.message}
						</span>
					)}
				</div>
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
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-medium text-monday-gray">Password Confirmation</p>
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
								{...register("confirm_password")}
							/>
						</label>
						{errors.confirm_password && (
							<span className="font-semibold text-sm text-monday-red  leading-none">
								{errors.confirm_password.message}
							</span>
						)}
					</div>
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
							{isPending ? "Loading..." : "Register Account"}
						</span>
					</button>
					<p className="font-semibold text-sm capitalize text-center text-monday-gray">
						Already have an account?{" "}
						<Link
							href={SIGN_IN_PAGE}
							className="text-monday-blue hover:underline"
						>
							Login Now
						</Link>
					</p>
				</div>
			</div>
		</form>
	);
}
