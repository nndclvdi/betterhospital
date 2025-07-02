import prisma from "@/shared/libs/prisma";

export async function getTransaction(id: string) {
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
				user: {
					select: {
						name: true,
						photo: true,
						gender: true,
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
