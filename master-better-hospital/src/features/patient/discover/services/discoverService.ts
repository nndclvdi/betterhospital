import prisma from "@/shared/libs/prisma";

export async function getSpecialist(limit?: number) {
	try {
		const data = await prisma.specialist.findMany({
			select: {
				id: true,
				name: true,
				photo: true,
				hospitals: {
					select: {
						_count: {
							select: {
								doctors: true,
							},
						},
					},
				},
			},
			take: limit,
		});

		return data.map((item) => {
			const total_doctors = item.hospitals.reduce((acc, curr) => {
				return acc + curr._count.doctors;
			}, 0);

			return {
				...item,
				total_doctors,
			};
		});
	} catch (error) {
		console.log(error);

		return [];
	}
}

export async function getDoctors() {
	try {
		const data = await prisma.doctor.findMany({
			select: {
				id: true,
				name: true,
				photo: true,
				hospitals: {
					take: 1,
					select: {
						hospital_specialist: {
							select: {
								specialist: {
									select: {
										name: true,
									},
								},
								hospital: {
									select: {
										name: true,
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

		return [];
	}
}

export async function getHospitalSpecialist(id: string) {
	try {
		const data = await prisma.specialist.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				photo: true,
				hospitals: {
					select: {
						_count: {
							select: {
								doctors: true,
							},
						},
						hospital: {
							select: {
								id: true,
								name: true,
								photo: true,
								city: true,
								postal_code: true,
								specialists: {
									select: {
										_count: {
											select: {
												doctors: true,
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

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}
