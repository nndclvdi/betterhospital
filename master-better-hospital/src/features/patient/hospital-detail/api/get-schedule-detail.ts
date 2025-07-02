import { GET_SCHEDULE_DETAIL_API } from "@/shared/constants/uri-be-page";
import { useQuery } from "@tanstack/react-query";

type Params = {
	doctorId: string;
	hospitalId: string;
	date: string;
};

export const getScheduleDetail = async ({
	doctorId,
	hospitalId,
	date,
}: Params): Promise<{ date: Date; is_available: boolean }[]> => {
	const response = await fetch(
		`${GET_SCHEDULE_DETAIL_API(doctorId, hospitalId)}?date=${date}`,
	);

	if (!response.ok) {
		throw new Error("Failed to get schedule detail");
	}

	return response.json();
};

export const useScheduleDetail = ({ date, doctorId, hospitalId }: Params) => {
	return useQuery({
		queryKey: ["schedule-detail", doctorId, hospitalId, date],
		queryFn: () => getScheduleDetail({ date, doctorId, hospitalId }),
		enabled: !!date,
	});
};
