import type { CheckoutDetailValues } from "@/app/api/checkout/checkout.schema";
import { GET_CHECKOUT_DETAIL_API } from "@/shared/constants/uri-be-page";
import { useQuery } from "@tanstack/react-query";
import type { DetailCheckout } from "../types/checkout";

export const getDetailCheckout = async (
	params: CheckoutDetailValues,
): Promise<DetailCheckout> => {
	const searchParams = new URLSearchParams(params);
	const response = await fetch(
		`${GET_CHECKOUT_DETAIL_API}?${searchParams.toString()}`,
	);

	if (!response.ok) {
		throw new Error("Failed to get detail checkout");
	}

	return response.json();
};

export const useDetailCheckout = (params: CheckoutDetailValues) => {
	return useQuery({
		queryKey: ["get-checkout-detail", params.doctor_id, params.hospital_id],
		queryFn: () => getDetailCheckout(params),
	});
};
