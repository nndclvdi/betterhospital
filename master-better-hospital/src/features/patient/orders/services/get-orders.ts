import prisma from "@/shared/libs/prisma";

export async function getOrders() {
	try {
		const data = await prisma.transaction.findMany({
			select: {
				hospital: {
					select: {
						name: true,
						photo: true,
						city: true,
						postal_code: true,
					},
				},
				specialist: {
					select: {
						name: true,
					},
				},
				id: true,
				booking_date: true,
				status: true,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}
