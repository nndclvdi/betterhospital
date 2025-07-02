import prisma from "@/shared/libs/prisma";

export async function getStats() {
	try {
		const totalRevenue = await prisma.transaction.aggregate({
			_sum: {
				total: true,
			},
		});
		const totalDoctors = await prisma.doctor.count();
		const totalHospitals = await prisma.hospital.count();
		const totalSpecialties = await prisma.specialist.count();
		const totalTransactions = await prisma.transaction.count();

		const recentTransactions = await prisma.transaction.findMany({
			orderBy: {
				createdAt: "desc",
			},
			take: 5,
			select: {
				id: true,
				doctor: {
					select: {
						name: true,
						photo: true,
					},
				},
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
				booking_date: true,
			},
		});

		return {
			totalRevenue: Number(totalRevenue._sum.total) || 0,
			totalDoctors: totalDoctors || 0,
			totalHospitals: totalHospitals || 0,
			totalSpecialties: totalSpecialties || 0,
			totalTransactions: totalTransactions || 0,
			recentTransactions,
		};
	} catch (error) {
		console.log(error);

		return {
			totalRevenue: 0,
			totalDoctors: 0,
			totalHospitals: 0,
			totalSpecialties: 0,
			totalTransactions: 0,
			recentTransactions: [],
		};
	}
}
