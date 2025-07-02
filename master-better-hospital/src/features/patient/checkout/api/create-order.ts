import { GET_CHECKOUT_DETAIL_API } from "@/shared/constants/uri-be-page";
import { useMutation } from "@tanstack/react-query";

export const createOrder = async (data: FormData): Promise<{ id: string }> => {
	const response = await fetch(GET_CHECKOUT_DETAIL_API, {
		method: "POST",
		body: data,
	});

	if (!response.ok) {
		throw new Error("Failed to create order");
	}

	return response.json();
};

export const useCreateOrder = () => {
	return useMutation({
		mutationFn: (data: FormData) => createOrder(data),
	});
};
