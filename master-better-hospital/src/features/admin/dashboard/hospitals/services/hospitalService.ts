import prisma from "@/shared/libs/prisma";

export async function getHospitals() {
	try {
		const data = await prisma.hospital.findMany({
			select: {
				id: true,
				name: true,
				photo: true,
				phone: true,
				city: true,
				_count: {
					select: {
						specialists: true,
					},
				},
			},
		});

		const mapTotalDoctors = await Promise.all(
			data.map(async (hospl) => {
				const totalDoctor = await prisma.hospitalDoctor.count({
					where: {
						hospital_specialist: {
							hospital_id: hospl.id,
						},
					},
				});

				return {
					id: hospl.id,
					city: hospl.city,
					photo: hospl.photo,
					phone: hospl.phone,
					name: hospl.name,
					total_specialist: hospl._count.specialists,
					total_doctor: totalDoctor,
				};
			}),
		);

		return mapTotalDoctors;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function findHospital(id: string) {
	try {
		const data = await prisma.hospital.findFirst({
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

export async function findDetailHospital(id: string) {
	try {
		const data = await prisma.hospital.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				photo: true,
				name: true,
				city: true,
				specialists: {
					select: {
						id: true,
						specialist: {
							select: {
								id: true,
								name: true,
								photo: true,
							},
						},
					},
				},
			},
		});

		const doctors = await prisma.hospitalDoctor.findMany({
			where: {
				hospital_specialist: {
					hospital_id: data.id,
				},
			},
			select: {
				doctor: {
					select: {
						id: true,
						photo: true,
						name: true,
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
		});

		return { ...data, doctors };
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function findAssignHospital(id: string) {
	try {
		const data = await prisma.hospital.findFirst({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				city: true,
				photo: true,
				_count: {
					select: {
						specialists: true,
						// doctors: true,
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

export async function getLoVSpecialists(hospitalId: string) {
	try {
		const hospitalSpecialist = await prisma.hospitalSpecialist.findMany({
			where: {
				hospital_id: hospitalId,
			},
			select: {
				specialist_id: true,
			},
		});

		const lov = await prisma.specialist.findMany({
			where: {
				id: {
					notIn: hospitalSpecialist.map((item) => item.specialist_id),
				},
			},
			select: {
				id: true,
				name: true,
			},
		});

		return lov;
	} catch (error) {
		console.log(error);

		return [];
	}
}
