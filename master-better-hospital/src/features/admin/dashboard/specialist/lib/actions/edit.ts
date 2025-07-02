"use server";

import type { FormState } from "@/shared/types/formState";
import { redirect } from "next/navigation";
import { EditSchema } from "../../types/zod";
import prisma from "@/shared/libs/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/shared/utils/image";
import { MANAGER_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";

export async function updateSpecialist(
	id: string,
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = EditSchema.safeParse({
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
		const filename = await uploadImage(
			validated.data.image,
			"specialist",
			true,
		);

		await prisma.specialist.update({
			where: {
				id,
			},
			data: {
				about: validated.data.about,
				name: validated.data.name,
				price: validated.data.price
					? Number.parseInt(validated.data.price)
					: undefined,
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

	revalidatePath(MANAGER_SPECIALIST_PAGE);
	redirect(MANAGER_SPECIALIST_PAGE);
}
