import type {
	typeToFlattenedError,
	ZodError,
	ZodIssue,
	ZodSchema,
	ZodType,
} from "zod";

export interface FormState {
	success: boolean;
	message?: string;
	errors?: ZodIssue[];
}
