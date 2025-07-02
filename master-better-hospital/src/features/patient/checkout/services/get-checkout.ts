import prisma from "@/shared/libs/prisma";

export async function getCheckout(id: string) {
	try {
		const data = await prisma.transaction.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				status: true,
				hospital: {
					select: {
						name: true,
					},
				},
				doctor: {
					select: {
						name: true,
						photo: true,
					},
				},
				booking_date: true,
				specialist: {
					select: {
						name: true,
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
