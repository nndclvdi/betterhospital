"use client";

import type { FormState } from "@/shared/types/formState";
import Link from "next/link";
import React, {
	type ChangeEvent,
	useActionState,
	useMemo,
	useRef,
	useState,
} from "react";
import { createSpecialist } from "../lib/actions/create";
import useGetError from "@/shared/hooks/useGetError";
import type { Specialist } from "../../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";
import { updateSpecialist } from "../lib/actions/edit";
import useUploadPhoto from "@/shared/hooks/useUploadPhoto";
import { MANAGER_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";

type FormProps =
	| {
			type: "EDIT";
			data: Specialist;
	  }
	| {
			type: "CREATE";
	  };

const initialState: FormState = {
	success: false,
};

export default function Form(props: FormProps) {
	const updateWithId = updateSpecialist.bind(
		null,
		props.type === "EDIT" ? props.data.id : "",
	);

	const [state, formAction, pending] = useActionState(
		props.type === "CREATE" ? createSpecialist : updateWithId,
		initialState,
	);

	const { handleChangePhoto, handleChoosePhoto, photo, uploadRef } =
		useUploadPhoto(
			props.type === "CREATE"
				? "/assets/images/icons/gallery-grey.svg"
				: getImageUrl(props.data.photo, "specialist"),
		);

	const defValues = useMemo(() => {
		if (props.type === "CREATE") {
			return {
				name: undefined,
				price: undefined,
				about: undefined,
			};
		}

		return {
			name: props.data.name,
			about: props.data.about,
			price: props.data.price,
		};
	}, [props]);

	const { getMessageError, isInputError } = useGetError(state);

	return (
		<form
			action={formAction}
			className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
		>
			<h2 className="font-semibold text-xl capitalize">Complete the form</h2>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Upload Image</p>
				<div className="flex items-center justify-between w-[500px]">
					<div className="group relative flex size-[100px] p-[14px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
						<img
							id="Thumbnail"
							src={photo}
							className="size-full object-contain"
							alt="icon"
						/>
						<input
							type="file"
							id="File-Input"
							name="image"
							accept="image/*"
							className="absolute inset-0 opacity-0 cursor-pointer"
							ref={uploadRef}
							onChange={handleChangePhoto}
						/>
					</div>
					<button
						type="button"
						id="Add-Photo"
						className="btn btn-black w-[152px] cursor-pointer font-semibold text-nowrap"
						onClick={handleChoosePhoto}
					>
						Add Photo
					</button>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Specialist Name</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("name") ? "invalid" : ""}`}
				>
					<label className="group relative w-[500px]">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/stetoscop-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
							Enter Name
						</p>
						<input
							type="text"
							name="name"
							className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
							placeholder=""
							defaultValue={defValues.name}
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("name")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Specialist Price</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("price") ? "invalid" : ""}`}
				>
					<label className="group relative w-[500px]">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/money-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-semibold text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:text-monday-black group-has-[:placeholder-shown]:text-lg group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
							Enter Price
						</p>
						<input
							type="number"
							name="price"
							className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[2px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300 group-[&.invalid]/errorState:border-monday-red"
							placeholder=""
							defaultValue={defValues.price}
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("price")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">Specialist About</p>
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
								Enter Description
							</p>
							<textarea
								name="about"
								className="appearance-none outline-none w-full font-semibold text-lg leading-[160%]"
								rows={3}
								placeholder=""
								defaultValue={defValues.about}
							/>
						</div>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("about")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-end gap-4">
				<Link
					href={MANAGER_SPECIALIST_PAGE}
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
