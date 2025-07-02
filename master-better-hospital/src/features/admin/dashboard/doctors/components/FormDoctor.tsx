"use client";

import useUploadPhoto from "@/shared/hooks/useUploadPhoto";
import React from "react";
import SelectHospital from "./SelectHospital";
import SelectSpecialist from "./SelectSpecialist";
import { FormProvider, useForm } from "react-hook-form";
import {
	createDoctorSchema,
	type CreateDoctorValues,
	editDoctorSchema,
} from "../helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFormDoctor from "../hooks/useFormDoctor";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/shared/utils/image";
import type { Doctor } from "../../../../../../generated/prisma";
import { MANAGER_DOCTORS_PAGE } from "@/shared/constants/uri-fe-page";

const THUMBNAIL_PHOTO = "/assets/images/icons/Avatar-default.svg";

type IDoctorEdit = Omit<Doctor, "createdAt" | "updatedAt"> & {
	hospital_id: string;
	specialist_id: string;
};

type IFormDoctorProps =
	| {
			type: "ADD";
	  }
	| {
			type: "EDIT";
			values: IDoctorEdit;
	  };

export default function FormDoctor(props: IFormDoctorProps) {
	const { handleChoosePhoto } = useUploadPhoto(
		"/assets/images/icons/Avatar-default.svg",
	);

	const defValues: IDoctorEdit | undefined =
		props.type === "EDIT" ? props.values : undefined;

	const form = useForm<CreateDoctorValues>({
		resolver: zodResolver(
			props.type === "ADD" ? createDoctorSchema : editDoctorSchema,
		),
		defaultValues: {
			about: defValues?.about,
			experience: defValues?.experience.toString(),
			gender: defValues?.gender,
			hospital_id: defValues?.hospital_id,
			name: defValues?.name,
			specialist_id: defValues?.specialist_id,
		},
	});

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = form;

	const { isPending, mutateAsync } = useFormDoctor({
		type: props.type,
		id: defValues?.id ?? "",
	});

	const photo = watch("photo");

	const onSubmit = async (val: CreateDoctorValues) => {
		try {
			const formData = new FormData();

			for (const [key, value] of Object.entries(val)) {
				formData.append(key, value);
			}

			await mutateAsync(formData);
			router.push(MANAGER_DOCTORS_PAGE);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
			>
				<h2 className="font-semibold text-xl capitalize">Complete the form</h2>
				<div className="flex items-center justify-between">
					<p className="font-medium text-lg text-monday-gray">Upload Image</p>
					<div className="flex items-center justify-between w-[500px]">
						<div className="group relative flex size-[100px] rounded-full overflow-hidden items-center justify-center bg-monday-background">
							<img
								id="Thumbnail"
								src={
									photo
										? URL.createObjectURL(photo)
										: props.type === "ADD"
											? THUMBNAIL_PHOTO
											: getImageUrl(props.values.photo, "doctors")
								}
								className="size-full object-cover"
								alt="icon"
							/>
							<input
								type="file"
								id="File-Input"
								accept="image/*"
								className="absolute inset-0 opacity-0 cursor-pointer"
								onChange={(e) => {
									if (e.target.files) {
										setValue("photo", e.target.files[0]);
									}
								}}
							/>
						</div>
						{errors.photo && (
							<span className="font-semibold text-lg text-monday-red leading-none">
								{errors.photo.message?.toString()}
							</span>
						)}
						<button
							type="button"
							id="Add-Photo"
							className="btn btn-black w-[152px] font-semibold text-nowrap"
							onClick={handleChoosePhoto}
						>
							Add Photo
						</button>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<p className="font-medium text-lg text-monday-gray">Doctor Name</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative w-[500px]">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/user-thin-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
								Enter Doctor Name
							</p>
							<input
								type="text"
								className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
								placeholder=""
								{...register("name")}
							/>
						</label>
						{errors.name && (
							<span className="font-semibold text-lg text-monday-red leading-none">
								{errors.name.message}
							</span>
						)}
					</div>
				</div>
				<div className="flex justify-between">
					<p className="font-medium text-lg text-monday-gray mt-[24.5px]">
						Doctor About
					</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group flex py-4 px-6 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-[500px] group-[&.invalid]/errorState:border-monday-red">
							<div className="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/note-text-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px] pl-4 w-full">
								<p className="placeholder font-semibold text-monday-gray text-sm group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:text-monday-black transition-300">
									Enter Doctor Description
								</p>
								<textarea
									className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
									rows={3}
									placeholder=""
									{...register("about")}
								/>
							</div>
						</label>
						{errors.name && (
							<span className="font-semibold text-lg text-monday-red leading-none">
								{errors.name.message}
							</span>
						)}
					</div>
				</div>
				<SelectHospital />
				<SelectSpecialist />
				<div className="flex justify-between">
					<p className="font-medium text-lg text-monday-gray mt-[24.5px]">
						Choose Gender
					</p>
					<div className="flex items-center gap-6 w-[500px] h-[56px]">
						<label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-full">
							<div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/man-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="font-semibold text-lg leading-none w-full">Male</p>
							<div className="flex size-4 shrink-0 rounded-full ring-2 ring-monday-black border-[3px] border-white group-has-[:checked]:bg-monday-blue group-has-[:checked]:ring-monday-blue transition-300" />
							<input
								type="radio"
								value="MALE"
								className="absolute opacity-0"
								{...register("gender")}
							/>
						</label>
						<label className="group relative flex items-center h-full py-4 px-5 gap-4 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-full">
							<div className="flex h-full shrink-0 pr-4 pl-1 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/woman-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="font-semibold text-lg leading-none w-full">
								Female
							</p>
							<div className="flex size-4 shrink-0 rounded-full ring-2 ring-monday-black border-[3px] border-white group-has-[:checked]:bg-monday-blue group-has-[:checked]:ring-monday-blue transition-300" />
							<input
								type="radio"
								value="FEMALE"
								className="absolute opacity-0"
								{...register("gender")}
							/>
						</label>
					</div>
				</div>

				{errors.gender && (
					<div className="flex justify-between">
						<span />
						<span className="font-semibold text-lg text-monday-red leading-none">
							{errors.gender.message}
						</span>
					</div>
				)}

				<div className="flex items-center justify-between">
					<p className="font-medium text-lg text-monday-gray">Experience</p>
					<div className="group/errorState flex flex-col gap-2">
						<label className="group relative w-[500px]">
							<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
								<img
									src="/assets/images/icons/briefcase-grey.svg"
									className="flex size-6 shrink-0"
									alt="icon"
								/>
							</div>
							<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
								Enter Years of Experience
							</p>
							<input
								type="number"
								className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-24 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
								placeholder=""
								{...register("experience")}
							/>
							<div className="flex items-center h-6 pl-[18px] absolute transform -translate-y-1/2 top-1/2 right-5 border-l-[1.5px] border-monday-border ">
								<span className="font-semibold text-lg leading-none">
									Years
								</span>
							</div>
						</label>
						{errors.name && (
							<div className="w-full">
								<span className="font-semibold text-right text-lg text-monday-red leading-none">
									{errors.name.message}
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="flex items-center justify-end gap-4">
					<a href="manage-doctors.html" className="btn btn-red font-semibold">
						Cancel
					</a>
					<button
						type="submit"
						disabled={isPending}
						className="btn btn-primary font-semibold rounded-full"
					>
						{isPending ? "Loading..." : "Create Now"}
					</button>
				</div>
			</form>
		</FormProvider>
	);
}
