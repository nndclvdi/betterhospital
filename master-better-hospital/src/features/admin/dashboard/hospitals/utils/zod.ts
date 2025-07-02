import { z } from "zod";

export const CreateSchema = z.object({
	photo: z
		.any()
		.refine((file: File) => file?.size > 0, { message: "Photo is required" }),
	name: z.string().min(5),
	phone: z.string().min(5),
	about: z.string().min(5),
	city: z.string().min(5, { message: "Please select city" }),
	postal_code: z.string().min(4),
	address: z.string().min(5),
});

export const EditSchema = CreateSchema.partial({
	about: true,
	address: true,
	city: true,
	name: true,
	phone: true,
	postal_code: true,
}).omit({
	photo: true,
});

export const CreateAssignSchema = z.object({
	specialist_id: z.string().min(1, { message: "Please select value" }),
});

export const DeleteAssignSchema = z.object({
	hospital_id: z.string(),
	hospital_specialist_id: z.string(),
});

export type CreateValues = z.infer<typeof CreateSchema>;
export type EditValues = z.infer<typeof EditSchema>;
export type CreateAssignValues = z.infer<typeof CreateAssignSchema>;
export type DeleteAssignValues = z.infer<typeof DeleteAssignSchema>;
