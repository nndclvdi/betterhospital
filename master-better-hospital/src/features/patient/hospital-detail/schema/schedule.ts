import { z } from "zod";

export const formScheduleSchema = z.object({
	date: z.string(),
	date_time: z.string(),
});

export type FormScheduleValues = z.infer<typeof formScheduleSchema>;
