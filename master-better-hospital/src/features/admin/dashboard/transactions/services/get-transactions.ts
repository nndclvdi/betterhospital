import prisma from "@/shared/libs/prisma";

export async function getTransactions() {
	try {
		const data = await prisma.transaction.findMany({
			orderBy: {
				createdAt: "desc",
			},
			select: {
				user: {
					select: {
						name: true,
						gender: true,
						photo: true,
					},
				},
				hospital: {
					select: {
						name: true,
						city: true,
						photo: true,
					},
				},
				status: true,
				specialist: {
					select: {
						name: true,
					},
				},
				booking_date: true,
				id: true,
			},
		});

		return data;
	} catch (error) {
		console.log(error);

		return [];
	}
}
