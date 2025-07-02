"use client";

import useGetError from "@/shared/hooks/useGetError";
import useUploadPhoto from "@/shared/hooks/useUploadPhoto";
import type { FormState } from "@/shared/types/formState";
import Link from "next/link";
import { useActionState, useMemo } from "react";
import type { Hospital } from "../../../../../../generated/prisma";
import { createHospital } from "../lib/actions/create";
import { getImageUrl } from "@/shared/utils/image";
import { updateHospital } from "../lib/actions/edit";
import { MANAGER_HOSPITALS_PAGE } from "@/shared/constants/uri-fe-page";

type FormProps =
	| {
			type: "EDIT";
			data: Hospital;
	  }
	| {
			type: "CREATE";
	  };

const initialState: FormState = {
	success: false,
};

export default function Form(props: FormProps) {
	const updateWithId = updateHospital.bind(
		null,
		props.type === "EDIT" ? props.data.id : "",
	);
	const [state, formAction, pending] = useActionState(
		props.type === "CREATE" ? createHospital : updateWithId,
		initialState,
	);

	console.log(state);

	const { getMessageError, isInputError } = useGetError(state);
	const { handleChangePhoto, handleChoosePhoto, photo, uploadRef } =
		useUploadPhoto(
			props.type === "CREATE"
				? "/assets/images/icons/gallery-default.svg"
				: getImageUrl(props.data.photo, "hospitals"),
		);

	const defValues = useMemo(() => {
		if (props.type === "CREATE") {
			return null;
		}

		return {
			...props.data,
		};
	}, [props]);

	return (
		<form
			action={formAction}
			className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
		>
			<h2 className="font-semibold text-xl capitalize">Complete the form</h2>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Upload Image</p>
				<div className="flex items-center justify-between w-[500px]">
					<div className="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
						<img
							id="Thumbnail"
							src={photo}
							className="size-full object-cover"
							alt="icon"
						/>
						<input
							type="file"
							accept="image/*"
							name="photo"
							className="absolute inset-0 opacity-0 cursor-pointer"
							ref={uploadRef}
							onChange={handleChangePhoto}
						/>
					</div>
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
				<p className="font-medium text-lg text-monday-gray">Hospital Name</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("name") ? "invalid" : ""}`}
				>
					<label className="group relative w-[500px]">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/hospital-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
							Enter Hospital Name
						</p>
						<input
							type="text"
							className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
							placeholder=""
							name="name"
							defaultValue={defValues?.name}
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("name")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Phone Number</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("phone") ? "invalid" : ""}`}
				>
					<label className="group relative w-[500px]">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/call-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
							Enter Phone Number
						</p>
						<input
							type="tel"
							className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
							placeholder=""
							name="phone"
							defaultValue={defValues?.phone}
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("phone")}
					</span>
				</div>
			</div>
			<div className="flex justify-between">
				<p className="font-medium text-lg text-monday-gray mt-[24.5px]">
					Hospital About
				</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("about") ? "invalid" : ""}`}
				>
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
								Enter Hospital Description
							</p>
							<textarea
								className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
								rows={3}
								placeholder=""
								name="about"
								defaultValue={defValues?.about}
							/>
						</div>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("about")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Hospital City</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("city") ? "invalid" : ""}`}
				>
					<label className="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden w-[500px] group-[&.invalid]/errorState:border-monday-red">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/buildings-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
							Select City
						</p>
						<select
							name="city"
							required
							className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
							defaultValue={defValues?.city}
						>
							<option hidden />
							<option value="Jakarta">Jakarta</option>
							<option value="Jakarta">Bandung</option>
							<option value="Jakarta">Surabaya</option>
						</select>
						<img
							src="/assets/images/icons/arrow-down-black.svg"
							className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
							alt="icon"
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("city")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Post Code</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("postal_code") ? "invalid" : ""}`}
				>
					<label className="group relative w-[500px]">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/barcode-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
							Enter Post Code
						</p>
						<input
							type="text"
							className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
							placeholder=""
							name="postal_code"
							defaultValue={defValues?.postal_code}
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("postal_code")}
					</span>
				</div>
			</div>
			<div className="flex justify-between">
				<p className="font-medium text-lg text-monday-gray mt-[24.5px]">
					Hospital Address
				</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("address") ? "invalid" : ""}`}
				>
					<label className="group flex py-4 px-6 rounded-3xl border-[2px] border-monday-border focus-within:border-monday-black transition-300 w-[500px] group-[&.invalid]/errorState:border-monday-red">
						<div className="flex h-full pr-4 pt-2 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/location-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<div className="flex flex-col gap-[6px] pl-4 w-full">
							<p className="placeholder font-semibold text-monday-gray text-sm group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:text-monday-black transition-300">
								Enter Address
							</p>
							<textarea
								className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
								rows={3}
								placeholder=""
								name="address"
								defaultValue={defValues?.address}
							/>
						</div>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("address")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-end gap-4">
				<Link
					href={MANAGER_HOSPITALS_PAGE}
					className="btn btn-red font-semibold"
				>
					Cancel
				</Link>
				<button
					type="submit"
					disabled={pending}
					className="btn btn-primary font-semibold rounded-full"
				>
					{pending ? "Loading..." : "Create Now"}
				</button>
			</div>
		</form>
	);
}
