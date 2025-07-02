import prisma from "@/shared/libs/prisma";

export async function getDoctor(hospital_id: string, doctor_id: string) {
	try {
		const data = await prisma.doctor.findFirstOrThrow({
			where: { id: doctor_id },
			select: {
				id: true,
				name: true,
				photo: true,
				experience: true,
				gender: true,
				about: true,
				hospitals: {
					where: {
						hospital_specialist: {
							hospital_id,
						},
					},
					select: {
						hospital_specialist: {
							select: {
								specialist: {
									select: {
										name: true,
										price: true,
									},
								},
							},
						},
					},
				},
			},
		});

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
}
