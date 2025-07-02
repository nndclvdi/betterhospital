import { z } from "zod";
import { Gender } from "../../../../../generated/prisma";

export const signUpSchema = z
	.object({
		photo: z
			.any()
			.refine((file: File) => file?.name, { message: "Photo is required" }),
		name: z.string().min(1, { message: "Name is required" }),
		phone: z.string().min(1, { message: "Phone is required" }),
		gender: z.nativeEnum(Gender, { message: "Please select gender" }),
		email: z.string().email(),
		password: z.string().min(5),
		confirm_password: z.string().min(5),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Password don't match",
		path: ["password"],
	});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
