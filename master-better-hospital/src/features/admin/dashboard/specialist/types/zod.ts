import { z } from "zod";

export const CreateSchema = z.object({
	image: z
		.any()
		.refine((file: File) => file?.name, { message: "Image required" }),
	name: z.string().min(5),
	price: z.string().min(1),
	about: z.string().min(5),
});

export const EditSchema = CreateSchema.partial({
	about: true,
	image: true,
	name: true,
	price: true,
});

export type CreateValues = z.infer<typeof CreateSchema>;
export type EditValues = z.infer<typeof EditSchema>;
