import React, { useActionState } from "react";
import { deleteAssign } from "../lib/actions/deleteAssign";

interface FormDeleteAssignProps {
	hospitalId: string;
	hospitalSpecialistId: string;
}

export default function FormDeleteAssign({
	hospitalId,
	hospitalSpecialistId,
}: FormDeleteAssignProps) {
	const [state, formAction, pending] = useActionState(deleteAssign, {
		success: false,
	});

	return (
		<form action={formAction}>
			<input type="hidden" name="hospital_id" defaultValue={hospitalId} />
			<input
				type="hidden"
				name="hospital_specialist_id"
				defaultValue={hospitalSpecialistId}
			/>
			<button
				type="submit"
				disabled={pending}
				className="flex cursor-pointer size-[56px] shrink-0 rounded-2xl p-4 bg-monday-red/10 items-center justify-center"
			>
				<img
					src="/assets/images/icons/trash-red-fill.svg"
					className="size-6"
					alt="icon"
				/>
			</button>
		</form>
	);
}
