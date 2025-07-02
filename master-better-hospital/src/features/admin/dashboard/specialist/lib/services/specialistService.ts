import prisma from "@/shared/libs/prisma";

export async function getSpecialists() {
	try {
		const data = await prisma.specialist.findMany({
			include: {
				_count: {
					select: {
						hospitals: true,
					},
				},
			},
		});

		const specialistWithTotalDoctor = await Promise.all(
			data.map(async (item) => {
				const hospitalDoctors = await prisma.hospitalDoctor.findMany({
					where: {
						hospital_specialist: {
							specialist_id: item.id,
						},
					},
					select: {
						hospital_specialist: {
							select: {
								_count: {
									select: {
										doctors: true,
									},
								},
							},
						},
					},
				});

				return {
					...item,
					total_doctor: hospitalDoctors.reduce((pre, curr) => {
						if (curr.hospital_specialist._count.doctors) {
							return pre + curr.hospital_specialist._count.doctors;
						}

						return pre;
					}, 0),
					test: hospitalDoctors,
				};
			}),
		);

		return specialistWithTotalDoctor;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function findSpecialist(id: string) {
	try {
		const data = await prisma.specialist.findFirstOrThrow({
			where: {
				id,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getSpecialistDoctors(id: string) {
	try {
		const hospitalSpecialist = await prisma.hospitalDoctor.findMany({
			where: { hospital_specialist: { specialist_id: id } },
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
			},
		});

		const specialist = await findSpecialist(id);

		return { ...specialist, hospitalSpecialist };
	} catch (error) {
		console.log(error);

		return null;
	}
}
