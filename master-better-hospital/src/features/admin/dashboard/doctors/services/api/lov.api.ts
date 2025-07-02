import type { CustomResponse } from "@/shared/types/response";
import type { Hospital } from "../../../../../../../generated/prisma";
import type { LovSpecialistValues } from "../../helpers/schema";
import {
	GET_LOV_HOSPITALS_API,
	GET_LOV_SPECIALISTS_API,
} from "@/shared/constants/uri-be-page";

export async function fetchLovHospitals(): Promise<
	Pick<Hospital, "id" | "name">[]
> {
	const response = await fetch(GET_LOV_HOSPITALS_API);

	if (!response.ok) {
		throw new Error("Failed to fetch hospitals");
	}

	return response.json();
}

export async function fetchLovSpecialist(
	hospital_id: string,
): Promise<CustomResponse<LovSpecialistValues[]>> {
	const response = await fetch(
		`${GET_LOV_SPECIALISTS_API}?hospital_id=${hospital_id}`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch specialist");
	}

	return response.json();
}
