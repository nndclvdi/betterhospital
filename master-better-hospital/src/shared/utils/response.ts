import type { CustomResponse } from "../types/response";

export function formatResponse<T>({
	data,
	success,
	message,
}: CustomResponse<T>) {
	return {
		data,
		success,
		message,
	};
}
