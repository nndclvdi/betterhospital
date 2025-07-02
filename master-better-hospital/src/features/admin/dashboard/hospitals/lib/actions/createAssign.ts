"use server";

import type { FormState } from "@/shared/types/formState";
import { CreateAssignSchema } from "../../utils/zod";
import prisma from "@/shared/libs/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MANAGER_HOSPITALS_DETAIL_PAGE } from "@/shared/constants/uri-fe-page";

export async function createAssignSpecialist(
	hospital_id: string,
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = CreateAssignSchema.safeParse({
		specialist_id: formData.get("specialist_id"),
	});

	if (!validated.success) {
		return {
			success: false,
			errors: validated.error.errors,
		};
	}

	try {
		await prisma.hospitalSpecialist.create({
			data: {
				hospital_id: hospital_id,
				specialist_id: validated.data.specialist_id,
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

	revalidatePath(MANAGER_HOSPITALS_DETAIL_PAGE(hospital_id));
	redirect(MANAGER_HOSPITALS_DETAIL_PAGE(hospital_id));
}
