"use server";

import prisma from "@/shared/libs/prisma";
import { createSession } from "@/shared/libs/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { LoginSchema } from "../../types/zod";
import type { FormState } from "@/shared/types/formState";
import { BASE_URI_ADMIN_PAGE } from "@/shared/constants/uri-fe-page";

export async function loginAuth(
	prevState: unknown,
	formData: FormData,
): Promise<FormState> {
	const validated = LoginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validated.success) {
		return {
			success: false,
			errors: validated.error.issues,
		};
	}

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: validated.data.email,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		if (!bcrypt.compareSync(validated.data.password, user.password)) {
			throw new Error("Invalid Password");
		}

		await createSession(user.id);
	} catch (error) {
		let message = "Database error";

		if (error instanceof Error) {
			message = error.message;
		}

		return {
			success: false,
			message,
		};
	}

	redirect(BASE_URI_ADMIN_PAGE);
}
