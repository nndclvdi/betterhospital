import { NextResponse, type NextRequest } from "next/server";
import { CreateOrderSchema } from "./checkout.schema";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { getUser } from "@/shared/libs/session";

export default async function doPost(request: NextRequest) {
	try {
		const user = await getUser("PATIENT");

		if (user === null) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
		}

		const formData = await request.formData();
		const validateBody = CreateOrderSchema.safeParse({
			booking_date: formData.get("booking_date"),
			subtotal: formData.get("subtotal"),
			tax_fee: formData.get("tax_fee"),
			total: formData.get("total"),
			proof: formData.get("proof"),
			hospital_id: formData.get("hospital_id"),
			doctor_id: formData.get("doctor_id"),
		});

		if (!validateBody.success) {
			return NextResponse.json(
				{ error: validateBody.error.errors },
				{ status: 400 },
			);
		}

		const checkout = validateBody.data;

		const paymentFilename = await uploadImage(checkout.proof, "payment");

		if (paymentFilename === null) {
			throw new Error("Failed to upload image");
		}

		const { hospital_specialist } =
			await prisma.hospitalDoctor.findFirstOrThrow({
				where: {
					doctor_id: checkout.doctor_id,
					hospital_specialist: {
						hospital_id: checkout.hospital_id,
					},
				},
				select: {
					hospital_specialist: {
						select: {
							specialist: {
								select: {
									id: true,
								},
							},
						},
					},
				},
			});

		const transaction = await prisma.transaction.create({
			data: {
				booking_date: checkout.booking_date,
				proof: paymentFilename,
				status: "PENDING",
				subtotal: Number(checkout.subtotal),
				tax_fee: Number(checkout.tax_fee),
				total: Number(checkout.total),
				doctor_id: checkout.doctor_id,
				hospital_id: checkout.hospital_id,
				specialist_id: hospital_specialist.specialist.id,
				user_id: user.id,
			},
		});

		return NextResponse.json({ id: transaction.id });
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			{ message: "Failed to create order" },
			{ status: 500 },
		);
	}
}
