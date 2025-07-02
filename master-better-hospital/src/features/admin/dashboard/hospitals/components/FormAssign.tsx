"use client";

import Link from "next/link";
import React, { useActionState } from "react";
import type { Specialist } from "../types/specialist";
import { createAssignSpecialist } from "../lib/actions/createAssign";
import type { FormState } from "@/shared/types/formState";
import useGetError from "@/shared/hooks/useGetError";
import { MANAGER_HOSPITALS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

interface FormAssignProps {
	lov: Specialist[];
	hospitalId: string;
}

const initialState: FormState = {
	success: false,
};

export default function FormAssign({ lov, hospitalId }: FormAssignProps) {
	const createAssignWithId = createAssignSpecialist.bind(null, hospitalId);

	const [state, formAction, pending] = useActionState(
		createAssignWithId,
		initialState,
	);

	const { getMessageError, isInputError } = useGetError(state);

	return (
		<form
			action={formAction}
			className="flex flex-col w-full rounded-3xl p-5 gap-5 bg-white"
		>
			<h2 className="font-semibold text-xl capitalize">Complete the form</h2>
			<div className="flex items-center justify-between">
				<p className="font-medium text-lg text-monday-gray">
					Choose Specialist
				</p>
				<div
					className={`group/errorState flex flex-col gap-2 ${isInputError("specialist_id") ? "invalid" : ""}`}
				>
					<label className="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden w-[500px] group-[&.invalid]/errorState:border-monday-red">
						<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
							<img
								src="/assets/images/icons/stetoscop-grey.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
						</div>
						<p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
							Select Specialist
						</p>
						<select
							name="specialist_id"
							className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
							defaultValue={""}
						>
							<option hidden value={""} />
							{lov.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</select>
						<img
							src="/assets/images/icons/arrow-down-black.svg"
							className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
							alt="icon"
						/>
					</label>
					<span className="font-semibold text-lg text-monday-red hidden leading-none group-[&.invalid]/errorState:block">
						{getMessageError("specialist_id")}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-end gap-4">
				<Link
					href={MANAGER_HOSPITALS_DETAIL_PAGE(hospitalId)}
					className="btn btn-red font-semibold"
				>
					Cancel
				</Link>
				<button
					type="submit"
					disabled={pending}
					className="btn btn-primary font-semibold rounded-full"
				>
					{pending ? "loading..." : "Assign Now"}
				</button>
			</div>
		</form>
	);
}
