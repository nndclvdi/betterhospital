import prisma from "@/shared/libs/prisma";
import { formatResponse } from "@/shared/utils/response";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const hospital_id = searchParams.get("hospital_id");

		if (!hospital_id) {
			return NextResponse.json(
				formatResponse({
					data: null,
					success: false,
					message: "Hospital ID not found",
				}),
				{
					status: 400,
				},
			);
		}

		const specialists = await prisma.hospitalSpecialist.findMany({
			where: {
				hospital_id,
			},
			select: {
				specialist: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});

		return NextResponse.json(
			formatResponse({
				data: specialists,
				success: true,
			}),
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			formatResponse({
				data: null,
				success: false,
			}),
		);
	}
}
