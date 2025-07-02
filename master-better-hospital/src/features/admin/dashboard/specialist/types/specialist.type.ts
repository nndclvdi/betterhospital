import type { Specialist } from "../../../../../../generated/prisma";

export type SpecialistInfo = Pick<
	Specialist,
	"id" | "photo" | "name" | "price"
> & {
	total_doctor: number;
};
