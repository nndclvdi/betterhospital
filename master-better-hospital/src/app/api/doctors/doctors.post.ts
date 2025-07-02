import { createDoctorSchema } from "@/features/admin/dashboard/doctors/helpers/schema";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { formatResponse } from "@/shared/utils/response";
import { NextResponse, type NextRequest } from "next/server";

export default async function doPost(request: NextRequest) {
	const formData = await request.formData();

	const parsed = createDoctorSchema.safeParse({
		photo: formData.get("photo"),
		name: formData.get("name"),
		about: formData.get("about"),
		hospital_id: formData.get("hospital_id"),
		specialist_id: formData.get("specialist_id"),
		gender: formData.get("gender"),
		experience: formData.get("experience"),
	});

	if (!parsed.success) {
		return NextResponse.json(
			formatResponse({
				data: null,
				success: false,
			}),
			{ status: 400 },
		);
	}

	try {
		const filename = await uploadImage(parsed.data.photo, "doctors");

		if (filename === null) {
			throw new Error("Failed to upload image");
		}

		const doctor = await prisma.doctor.create({
			data: {
				about: parsed.data.about,
				name: parsed.data.name,
				experience: Number.parseInt(parsed.data.experience),
				gender: parsed.data.gender,
				photo: filename,
			},
		});

		const hospital_specialist =
			await prisma.hospitalSpecialist.findFirstOrThrow({
				where: {
					hospital_id: parsed.data.hospital_id,
					specialist_id: parsed.data.specialist_id,
				},
			});

		await prisma.hospitalDoctor.create({
			data: {
				doctor_id: doctor.id,
				hospital_specialist_id: hospital_specialist.id,
			},
		});

		return NextResponse.json(formatResponse({ data: null, success: false }));
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
