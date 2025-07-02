import { signUpSchema } from "@/features/patient/auth/helpers/schema";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { formatResponse } from "@/shared/utils/response";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();

		const parsed = signUpSchema.safeParse({
			name: formData.get("name"),
			phone: formData.get("phone"),
			gender: formData.get("gender"),
			email: formData.get("email"),
			password: formData.get("password"),
			confirm_password: formData.get("confirm_password"),
			photo: formData.get("photo"),
		});

		if (!parsed.success) {
			console.log(parsed.error.errors);
			return NextResponse.json(
				formatResponse({
					data: null,
					success: false,
					message: "Validation Failed",
				}),
				{ status: 500 },
			);
		}

		const filename = await uploadImage(parsed.data.photo, "patients");

		if (filename === null) {
			throw new Error("Upload Image failed");
		}

		await prisma.user.create({
			data: {
				email: parsed.data.email,
				gender: parsed.data.gender,
				name: parsed.data.name,
				password: bcrypt.hashSync(parsed.data.password, 12),
				phone: parsed.data.phone,
				photo: filename,
				role: "PATIENT",
			},
		});

		return NextResponse.json(
			formatResponse({
				data: null,
				success: true,
			}),
		);
	} catch (error) {
		let messageError = "Failed to create data";

		if (error instanceof Error) {
			messageError = error.message;
		}
		return NextResponse.json(
			{
				success: false,
				message: messageError,
			},
			{ status: 500 },
		);
	}
}
