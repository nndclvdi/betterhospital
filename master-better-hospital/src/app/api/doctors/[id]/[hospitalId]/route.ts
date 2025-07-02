import prisma from "@/shared/libs/prisma";
import dayjs from "dayjs";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const dateSchema = z.date();

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string; hospitalId: string } },
) {
	try {
		const { hospitalId, id } = await params;
		const searchParams = request.nextUrl.searchParams;
		const date = searchParams.get("date");

		const validate = dateSchema.safeParse(dayjs(date).toDate());

		if (!validate.success) {
			return NextResponse.json([], { status: 400 });
		}

		const TIME_SCHEDULES = [
			"10:30",
			"11:30",
			"13:30",
			"14:30",
			"15:30",
			"16:30",
		];

		const schedules = await Promise.all(
			TIME_SCHEDULES.map(async (time) => {
				const [hour, minute] = time.split(":");
				const fullDate = dayjs(validate.data)
					.hour(Number(hour))
					.minute(Number(minute));

				const checkAvailable = await prisma.transaction.count({
					where: {
						booking_date: {
							gte: fullDate.toDate(),
							lt: fullDate.add(1, "hour").toDate(),
						},
						doctor_id: id,
						hospital_id: hospitalId,
					},
				});

				return {
					date: fullDate,
					is_available: checkAvailable === 0,
				};
			}),
		);

		return NextResponse.json(schedules);
	} catch (error) {
		console.log(error);

		return NextResponse.json([], { status: 500 });
	}
}
