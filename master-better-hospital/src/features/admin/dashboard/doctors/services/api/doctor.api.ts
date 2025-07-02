import {
	CREATE_DOCTOR_API,
	UPDATE_DOCTOR_API,
} from "@/shared/constants/uri-be-page";

export async function createDoctor(body: FormData) {
	const response = await fetch(CREATE_DOCTOR_API, {
		method: "POST",
		body,
	});

	if (!response.ok) {
		throw new Error("Failed to create doctor");
	}

	return response.json();
}

export async function updateDoctor(body: FormData, id: string) {
	const response = await fetch(UPDATE_DOCTOR_API(id), {
		method: "PUT",
		body,
	});

	if (!response.ok) {
		throw new Error("Failed to update doctor");
	}

	return response.json();
}
