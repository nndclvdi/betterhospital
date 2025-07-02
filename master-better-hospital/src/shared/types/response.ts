export type CustomResponse<T> = {
	success: boolean;
	message?: string;
	data: T | null;
};
