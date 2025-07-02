import prisma from "@/shared/libs/prisma";
import dayjs from "dayjs";

export const getDoctorSchedule = async (
	doctorId: string,
	hospitalId: string,
) => {
	try {
		const doctor = await prisma.doctor.findFirstOrThrow({
			where: {
				id: doctorId,
			},
			select: {
				id: true,
				name: true,
				photo: true,
				experience: true,
				gender: true,
				hospitals: {
					where: {
						hospital_specialist: {
							hospital_id: hospitalId,
						},
					},
					select: {
						hospital_specialist: {
							select: {
								hospital: {
									select: {
										id: true,
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
							},
						},
					},
				},
			},
		});

		const today = dayjs();
		const threeDaysAhead = Array.from({ length: 3 }, (_, i) =>
			today.add(i + 1, "day"),
		).map((date) => date.toISOString());

		return { ...doctor, schedules: threeDaysAhead };
	} catch (error) {
		console.log(error);
		return null;
	}
};
