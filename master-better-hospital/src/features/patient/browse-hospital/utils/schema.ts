import { z } from "zod";

export const hospitalSpecialistSchema = z.object({
	id: z.string(),
	name: z.string(),
	photo: z.string(),
	hospitals: z.array(
		z.object({
			_count: z.object({ doctors: z.number() }),
			hospital: z.object({
				id: z.string(),
				name: z.string(),
				photo: z.string(),
				city: z.string(),
				postal_code: z.string(),
				specialists: z.array(
					z.object({ _count: z.object({ doctors: z.number() }) }),
				),
			}),
		}),
	),
});

export type HospitalSpecialistValues = z.infer<typeof hospitalSpecialistSchema>;
