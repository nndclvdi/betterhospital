import { useQuery } from "@tanstack/react-query";
import { fetchLovSpecialist } from "../services/api/lov.api";

const useLovSpecialist = (hospital_id: string) => {
	const { data, isLoading, isPending, error } = useQuery({
		queryKey: ["lov-specialist", hospital_id],
		queryFn: () => fetchLovSpecialist(hospital_id),
		enabled: !!hospital_id,
		select: (data) => data.data,
	});

	return {
		data,
		isLoading,
		isPending,
		error,
	};
};

export default useLovSpecialist;
