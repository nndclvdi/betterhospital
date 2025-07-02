import { z } from "zod";
import { Gender } from "../../../../../../generated/prisma";

export const photoSchema = z
	.any()
	.refine((file: File) => file?.name, { message: "Photo is required" });

export const createDoctorSchema = z.object({
	photo: photoSchema,
	name: z.string().min(3),
	about: z.string().min(5),
	hospital_id: z.string().min(1, { message: "Hospital ID required" }),
	specialist_id: z.string().min(1, { message: "Specialist ID required" }),
	gender: z.nativeEnum(Gender, { message: "Please Select Gender" }),
	experience: z.string(),
});

export const editDoctorSchema = createDoctorSchema.omit({
	photo: true,
});

export const lovSpecialistSchema = z.object({
	specialist: z.object({ id: z.string(), name: z.string() }),
});

export type CreateDoctorValues = z.infer<typeof createDoctorSchema>;
export type LovSpecialistValues = z.infer<typeof lovSpecialistSchema>;
export type EditDoctorValues = z.infer<typeof editDoctorSchema>;
