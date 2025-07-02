import type { SessionType } from "../types/auth";

export const SESSION_MANAGER_NAME = "AUTH_MANAGER_HOSPITAL";
export const SESSION_PATIENT_NAME = "AUTH_PATIENT_HOSPITAL";

export const SESSION_DETAIL: Record<
	SessionType,
	Record<"name" | "path" | "redirect", string>
> = {
	MANAGER: {
		name: SESSION_MANAGER_NAME,
		path: "/dashboard",
		redirect: "/dashboard/login",
	},
	PATIENT: {
		name: SESSION_PATIENT_NAME,
		path: "/",
		redirect: "/sign-in",
	},
};
