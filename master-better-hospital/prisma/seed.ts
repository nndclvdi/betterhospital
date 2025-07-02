import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
	const manager = await prisma.user.upsert({
		where: {
			email: "manager@mail.com",
		},
		update: {},
		create: {
			name: "Manager",
			email: "manager@mail.com",
			gender: "MALE",
			phone: "081234566",
			photo: "photo.jpg",
			role: "MANAGER",
			password: "$2a$12$AJDoleDruiOrwp3B2IBmbuCQrihmjQsYNGg0IMXHhxdsoJ9OIrL.G",
		},
	});

	console.log({ manager });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
