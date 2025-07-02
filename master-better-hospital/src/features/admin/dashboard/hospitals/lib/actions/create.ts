"use server";

import type { FormState } from "@/shared/types/formState";
import { CreateSchema } from "../../utils/zod";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MANAGER_HOSPITALS_PAGE } from "@/shared/constants/uri-fe-page";

export async function createHospital(
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = CreateSchema.safeParse({
		photo: formData.get("photo"),
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

	try {
		const filename = await uploadImage(
			validated.data.photo,
			"hospitals",
			false,
		);

		if (filename === null) {
			throw new Error("Failed to upload image");
		}

		await prisma.hospital.create({
			data: {
				name: validated.data.name,
				about: validated.data.about,
				address: validated.data.address,
				city: validated.data.city,
				phone: validated.data.phone,
				postal_code: validated.data.postal_code,
				photo: filename,
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

	revalidatePath(MANAGER_HOSPITALS_PAGE);
	redirect(MANAGER_HOSPITALS_PAGE);
}
