"use server";

import type { FormState } from "@/shared/types/formState";
import { EditSchema } from "../../utils/zod";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MANAGER_HOSPITALS_PAGE } from "@/shared/constants/uri-fe-page";

export async function updateHospital(
	id: string,
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = EditSchema.safeParse({
		name: formData.get("name"),
		phone: formData.get("phone"),
		about: formData.get("about"),
		city: formData.get("city"),
		postal_code: formData.get("postal_code"),
		address: formData.get("address"),
	});

	if (!validated.success) {
		return {
			success: false,
			errors: validated.error.issues,
		};
	}

	const fileUploaded = formData.get("photo") as File;

	try {
		const oldData = await prisma.hospital.findFirstOrThrow({
			where: {
				id,
			},
		});

		let filename = oldData.photo;

		if (fileUploaded.size > 0) {
			filename = (await uploadImage(fileUploaded, "hospitals", true)) ?? "";
		}

		await prisma.hospital.update({
			where: {
				id,
			},
			data: {
				name: validated.data.name,
				about: validated.data.about,
				address: validated.data.address,
				city: validated.data.city,
				phone: validated.data.phone,
				postal_code: validated.data.postal_code,
				photo: filename ?? undefined,
			},
		});
	} catch (error) {
		let messageError = "Failed to update data";

		if (error instanceof Error) {
			messageError = error.message;
		}

		return {
			success: false,
			message: messageError,
		};
	}

	revalidatePath(MANAGER_HOSPITALS_PAGE);
	redirect(MANAGER_HOSPITALS_PAGE);
}
