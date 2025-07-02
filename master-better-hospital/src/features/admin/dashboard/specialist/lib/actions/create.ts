"use server";

import type { FormState } from "@/shared/types/formState";
import { redirect } from "next/navigation";
import { CreateSchema } from "../../types/zod";
import prisma from "@/shared/libs/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/shared/utils/image";
import { MANAGER_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";

export async function createSpecialist(
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = CreateSchema.safeParse({
		image: formData.get("image"),
		name: formData.get("name"),
		price: formData.get("price"),
		about: formData.get("about"),
	});

	if (!validated.success) {
		return {
			success: false,
			errors: validated.error.issues,
		};
	}

	try {
		const filename = await uploadImage(validated.data.image, "specialist");

		if (filename === null) {
			throw new Error("Failed to upload image");
		}

		await prisma.specialist.create({
			data: {
				about: validated.data.about,
				name: validated.data.name,
				price: Number.parseInt(validated.data.price),
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

	revalidatePath(MANAGER_SPECIALIST_PAGE);
	redirect(MANAGER_SPECIALIST_PAGE);
}
