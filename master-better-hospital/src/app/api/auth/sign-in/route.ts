import { signInSchema } from "@/features/patient/auth/helpers/schema";
import prisma from "@/shared/libs/prisma";
import { formatResponse } from "@/shared/utils/response";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/shared/libs/session";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const parsed = signInSchema.safeParse({
			email: body.email,
			password: body.password,
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

		const user = await prisma.user.findFirst({
			where: {
				email: parsed.data.email,
			},
		});

		if (!user) {
			return NextResponse.json(
				formatResponse({
					data: null,
					success: false,
					message: "User not found",
				}),
				{ status: 400 },
			);
		}

		const checkedPassword = bcrypt.compareSync(
			parsed.data.password,
			user.password,
		);

		if (!checkedPassword) {
			return NextResponse.json(
				formatResponse({
					data: null,
					success: false,
					message: "Password incorrect",
				}),
			);
		}

		await createSession(user.id, "PATIENT");

		return NextResponse.json(
			formatResponse({
				data: null,
				success: true,
				message: "Success sign-in",
			}),
		);
	} catch (error) {
		let messageError = "Failed to sign in";

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
