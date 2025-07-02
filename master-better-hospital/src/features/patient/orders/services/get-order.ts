import prisma from "@/shared/libs/prisma";

export async function getOrder(id: string) {
	try {
		const data = await prisma.transaction.findFirstOrThrow({
			where: {
				id,
			},
			include: {
				hospital: {
					select: {
						name: true,
						photo: true,
						city: true,
						postal_code: true,
						address: true,
					},
				},
				specialist: {
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
			},
		});

		return data;
	} catch (error) {
		console.log(error);

		return null;
	}
}
