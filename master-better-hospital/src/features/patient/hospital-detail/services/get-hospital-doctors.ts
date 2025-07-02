import prisma from "@/shared/libs/prisma";

export async function getHospitalDoctors(id: string) {
	try {
		const hospital = await prisma.hospital.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				photo: true,
				city: true,
				postal_code: true,
				specialists: {
					select: {
						doctors: {
							select: {
								doctor: {
									select: {
										id: true,
										name: true,
										photo: true,
										experience: true,
										gender: true,
									},
								},
								hospital_specialist: {
									select: {
										specialist: {
											select: {
												name: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return hospital;
	} catch (error) {
		console.log(error);

		return null;
	}
}
