import type { Gender } from "../../../../../generated/prisma";

export type DetailCheckout = {
	doctor: {
		id: string;
		name: string;
		photo: string;
		gender: Gender;
		experience: number;
	};
	hospital_specialist: {
		specialist: {
			name: string;
			price: number;
		};
		hospital: {
			name: string;
			photo: string;
			city: string;
			postal_code: string;
		};
	};
};
