import prisma from "@/shared/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const hospitals = await prisma.hospital.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return NextResponse.json(hospitals);
	} catch (error) {
		console.log(error);
		return NextResponse.json([], {
			status: 500,
		});
	}
}
