import { z } from "zod";

export const CheckoutDetailSchema = z.object({
	hospital_id: z.string(),
	doctor_id: z.string(),
});
export type CheckoutDetailValues = z.infer<typeof CheckoutDetailSchema>;

export const CreateOrderSchema = CheckoutDetailSchema.extend({
	booking_date: z.string(),
	subtotal: z.string(),
	tax_fee: z.string(),
	total: z.string(),
	proof: z.instanceof(File).refine((file) => file?.type.includes("image"), {
		message: "File must be image",
	}),
});

export type CreateOrderValues = z.infer<typeof CreateOrderSchema>;
