export const BASE_URI_API = "/api";

export const GET_LOV_HOSPITALS_API = `${BASE_URI_API}/lov/hospitals`;
export const GET_LOV_SPECIALISTS_API = `${BASE_URI_API}/lov/specialist`;

export const CREATE_DOCTOR_API = `${BASE_URI_API}/doctors`;
export const UPDATE_DOCTOR_API = (id: string) =>
	`${BASE_URI_API}/doctors/${id}`;

export const UPDATE_TRANSACTION_API = `${BASE_URI_API}/transaction/approve`;

export const GET_SCHEDULE_DETAIL_API = (id: string, hospitalId: string) =>
	`${BASE_URI_API}/doctors/${id}/${hospitalId}`;

export const GET_CHECKOUT_DETAIL_API = `${BASE_URI_API}/checkout`;

export const SIGN_UP_API = "/api/auth/sign-up";
export const SIGN_IN_API = "/api/auth/sign-in";
