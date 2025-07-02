export const BASE_URI_ADMIN_PAGE = "/dashboard/manager";

// ADMIN PAGE
// Specialist
export const MANAGER_SPECIALIST_PAGE = `${BASE_URI_ADMIN_PAGE}/specialist`;
export const MANAGER_SPECIALIST_CREATE_PAGE = `${MANAGER_SPECIALIST_PAGE}/create`;
export const MANAGER_SPECIALIST_EDIT_PAGE = (id: string) =>
	`${MANAGER_SPECIALIST_PAGE}/edit/${id}`;
export const MANAGER_SPECIALIST_DETAIL_PAGE = (id: string) =>
	`${MANAGER_SPECIALIST_PAGE}/detail/${id}`;

// Hospitals
export const MANAGER_HOSPITALS_PAGE = `${BASE_URI_ADMIN_PAGE}/hospitals`;
export const MANAGER_HOSPITALS_CREATE_PAGE = `${MANAGER_HOSPITALS_PAGE}/create`;
export const MANAGER_HOSPITALS_EDIT_PAGE = (id: string) =>
	`${MANAGER_HOSPITALS_PAGE}/edit/${id}`;
export const MANAGER_HOSPITALS_DETAIL_PAGE = (id: string) =>
	`${MANAGER_HOSPITALS_PAGE}/${id}`;
export const MANAGER_HOSPITALS_ASSIGN_PAGE = (hospitalId: string) =>
	`${MANAGER_HOSPITALS_DETAIL_PAGE(hospitalId)}/specialist`;

// Transactions
export const MANAGER_TRANSACTIONS_PAGE = `${BASE_URI_ADMIN_PAGE}/transactions`;
export const MANAGER_TRANSACTIONS_DETAIL_PAGE = (id: string) =>
	`${MANAGER_TRANSACTIONS_PAGE}/${id}`;

// Doctors
export const MANAGER_DOCTORS_PAGE = `${BASE_URI_ADMIN_PAGE}/doctors`;
export const MANAGER_DOCTORS_CREATE_PAGE = `${MANAGER_DOCTORS_PAGE}/create`;
export const MANAGER_DOCTORS_EDIT_PAGE = (id: string) =>
	`${MANAGER_DOCTORS_PAGE}/edit/${id}`;
export const MANAGER_DOCTORS_DETAIL_PAGE = (id: string) =>
	`${MANAGER_DOCTORS_PAGE}/detail/${id}`;

// CUSTOMER PAGE
export const SIGN_IN_PAGE = "/sign-in";
export const SIGN_UP_PAGE = "/sign-up";

// Home
export const HOME_PAGE = "/home";
export const BROWSE_SPECIALIST_PAGE = `${HOME_PAGE}/browse-specialist`;
export const BROWSE_SPECIALIST_DETAIL_PAGE = (id: string) =>
	`${BROWSE_SPECIALIST_PAGE}/${id}`;
export const HOSPITAL_DETAIL_PAGE = (id: string) =>
	`${HOME_PAGE}/hospital/${id}`;
export const HOSPITAL_DOCTORS_PAGE = (id: string) =>
	`${HOME_PAGE}/hospital/${id}/doctors`;
export const HOSPITAL_DOCTORS_DETAIL_PAGE = (
	hospitalId: string,
	doctorId: string,
) => `${HOME_PAGE}/hospital/${hospitalId}/doctors/${doctorId}`;

export const HOSPITAL_DOCTORS_BOOK_PAGE = (
	hospitalId: string,
	doctorId: string,
) => `${HOME_PAGE}/hospital/${hospitalId}/doctors/${doctorId}/book`;

export const BOOK_APPOINTMENT = `${HOME_PAGE}/appointment/booking`;
export const BOOK_APPOINTMENT_SUCCESS = (id: string) =>
	`${BOOK_APPOINTMENT}/${id}`;

export const ORDERS_PAGE = `${HOME_PAGE}/orders`;
export const ORDER_DETAIL_PAGE = (id: string) => `${HOME_PAGE}/orders/${id}`;
export const INBOX_PAGE = `${HOME_PAGE}/inbox`;
export const SETTINGS_PAGE = `${HOME_PAGE}/settings`;
