"use server";

import prisma from "@/shared/libs/prisma";
import type { FormState } from "@/shared/types/formState";
import { revalidatePath } from "next/cache";
import { DeleteAssignSchema } from "../../utils/zod";
import { MANAGER_HOSPITALS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

export async function deleteAssign(
	prevState: unknown,
	formData: FormData,
): Promise<FormState | undefined> {
	const validated = DeleteAssignSchema.safeParse({
		hospital_id: formData.get("hospital_id"),
		hospital_specialist_id: formData.get("hospital_specialist_id"),
	});

	if (!validated.success) {
		return {
			success: false,
			errors: validated.error.errors,
		};
	}

	try {
		await prisma.hospitalSpecialist.delete({
			where: {
				id: validated.data.hospital_specialist_id,
			},
		});
	} catch (error) {
		let messageError = "Failed to create data";

		if (error instanceof Error) {
			messageError = error.message;
		}

		return {
			success: false,
			message: messageError,
		};
	}

	revalidatePath(MANAGER_HOSPITALS_DETAIL_PAGE(validated.data.hospital_id));
}
