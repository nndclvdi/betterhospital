import { UPDATE_TRANSACTION_API } from "@/shared/constants/uri-be-page";
import type { ApprovalRequest } from "@/shared/utils/schema";
import { useMutation } from "@tanstack/react-query";

export const updateTransaction = async (data: ApprovalRequest) => {
	const response = await fetch(UPDATE_TRANSACTION_API, {
		method: "POST",
		body: JSON.stringify(data),
	});

	console.log(response);

	if (!response.ok) {
		throw new Error("Failed to update transaction");
	}

	return response.json();
};

export const useUpdateTransaction = () => {
	return useMutation({
		mutationFn: (data: ApprovalRequest) => updateTransaction(data),
	});
};
