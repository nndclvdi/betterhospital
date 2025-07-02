import prisma from "@/shared/libs/prisma";

export async function getDoctors() {
	try {
		const data = await prisma.doctor.findMany({
			select: {
				id: true,
				name: true,
				gender: true,
				experience: true,
				photo: true,
				hospitals: {
					select: {
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
		});

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function findDoctor(id: string) {
	try {
		const data = await prisma.doctor.findFirstOrThrow({
			where: {
				id,
			},
		});

		const hospital_specialist = await prisma.hospitalDoctor.findFirstOrThrow({
			where: {
				doctor_id: data.id,
			},
			select: {
				hospital_specialist: {
					select: {
						hospital_id: true,
						specialist_id: true,
					},
				},
			},
		});

		return { ...data, specialist: hospital_specialist.hospital_specialist };
	} catch (error) {
		console.log(error);

		return null;
	}
}

export async function findDoctorTransaction(id: string) {
	try {
		const data = await prisma.doctor.findFirstOrThrow({
			where: { id },
			select: {
				id: true,
				photo: true,
				name: true,
				experience: true,
				gender: true,
				transactions: {
					select: {
						id: true,
						user: {
							select: {
								name: true,
								photo: true,
								gender: true,
							},
						},
						booking_date: true,
						status: true,
					},
				},
			},
		});

		const hospital_specialist = await prisma.hospitalDoctor.findFirstOrThrow({
			where: {
				doctor_id: data.id,
			},
			select: {
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
		});

		return {
			...data,
			specialist: hospital_specialist.hospital_specialist.specialist,
		};
	} catch (error) {
		console.log(error);

		return null;
	}
}
