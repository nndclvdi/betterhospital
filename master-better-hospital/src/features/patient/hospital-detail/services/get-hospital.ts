import prisma from "@/shared/libs/prisma";

export async function getHospital(id: string) {
	try {
		const data = await prisma.hospital.findFirstOrThrow({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				photo: true,
				city: true,
				address: true,
				about: true,
				postal_code: true,
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}
