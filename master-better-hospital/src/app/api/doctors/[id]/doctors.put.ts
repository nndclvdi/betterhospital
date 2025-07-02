import { editDoctorSchema } from "@/features/admin/dashboard/doctors/helpers/schema";
import prisma from "@/shared/libs/prisma";
import { uploadImage } from "@/shared/utils/image";
import { formatResponse } from "@/shared/utils/response";
import { type NextRequest, NextResponse } from "next/server";

export async function doPut(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const formData = await request.formData();
	const { id } = await params;

	const parsed = editDoctorSchema.safeParse({
		// photo: formData.get("photo"),
		name: formData.get("name"),
		about: formData.get("about"),
		hospital_id: formData.get("hospital_id"),
		specialist_id: formData.get("specialist_id"),
		gender: formData.get("gender"),
		experience: formData.get("experience"),
	});

	if (!parsed.success) {
		console.log(parsed.error.issues);
		return NextResponse.json(
			formatResponse({
				data: null,
				success: false,
			}),
			{ status: 400 },
		);
	}

	try {
		const oldDoctor = await prisma.doctor.findFirstOrThrow({
			where: { id },
		});

		const formDataPhoto = formData.get("photo") as File;

		let filename: string | null = null;

		if (formDataPhoto !== null) {
			filename = await uploadImage(formDataPhoto, "doctors");

			if (filename === null) {
				throw new Error("Failed to upload image");
			}
		}

		const doctor = await prisma.doctor.update({
			where: {
				id,
			},
			data: {
				about: parsed.data.about,
				name: parsed.data.name,
				experience: Number.parseInt(parsed.data.experience),
				gender: parsed.data.gender,
				photo: formDataPhoto ? (filename ?? undefined) : oldDoctor.photo,
			},
		});

		const hospital_specialist =
			await prisma.hospitalSpecialist.findFirstOrThrow({
				where: {
					hospital_id: parsed.data.hospital_id,
					specialist_id: parsed.data.specialist_id,
				},
			});

		// await prisma.hospitalDoctor.create({
		// 	data: {
		// 		doctor_id: doctor.id,
		// 		hospital_specialist_id: hospital_specialist.id,
		// 	},
		// });

		return NextResponse.json(formatResponse({ data: null, success: false }));
	} catch (error) {
		console.log(error);
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
