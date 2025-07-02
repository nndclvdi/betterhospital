import { useQuery } from "@tanstack/react-query";
import { fetchLovHospitals } from "../services/api/lov.api";

export const useLovHospitals = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["lov-hospitals"],
		queryFn: fetchLovHospitals,
	});

	return {
		data,
		isLoading,
		isError,
		error,
	};
};
