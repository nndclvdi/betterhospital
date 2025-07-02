import { type NextRequest, NextResponse } from "next/server";
import { CheckoutDetailSchema } from "./checkout.schema";
import prisma from "@/shared/libs/prisma";

export default async function doGet(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const validate = CheckoutDetailSchema.safeParse({
			hospital_id: searchParams.get("hospital_id"),
			doctor_id: searchParams.get("doctor_id"),
		});

		if (!validate.success) {
			return NextResponse.json(
				{ message: "Validation Error" },
				{ status: 400 },
			);
		}

		const data = await prisma.hospitalDoctor.findFirstOrThrow({
			where: {
				doctor_id: validate.data.doctor_id,
				hospital_specialist: {
					hospital_id: validate.data.hospital_id,
				},
			},
			select: {
				doctor: {
					select: {
						id: true,
						name: true,
						photo: true,
						gender: true,
						experience: true,
					},
				},
				hospital_specialist: {
					select: {
						specialist: {
							select: {
								name: true,
								price: true,
							},
						},
						hospital: {
							select: {
								name: true,
								photo: true,
								city: true,
								postal_code: true,
							},
						},
					},
				},
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ message: "Failed to get detail checkout" },
			{ status: 500 },
		);
	}
}
