import { z } from "zod";
import { create } from "zustand";

const CheckoutSchema = z.object({
	hospital_id: z.string(),
	doctor_id: z.string(),
	booking_date: z.date(),
});

type Checkout = z.infer<typeof CheckoutSchema>;

interface CheckoutState {
	data: Checkout | null;
	update: (data: Checkout) => void;
}

export const useCheckout = create<CheckoutState>()((set) => ({
	data: null,
	update: (data) => set((state) => ({ data })),
}));
