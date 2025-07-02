import { SIGN_UP_API } from "@/shared/constants/uri-be-page";

export async function signUpApi(body: FormData) {
	const response = await fetch(SIGN_UP_API, {
		method: "POST",
		body,
	});

	if (!response.ok) {
		throw new Error("Failed to create doctor");
	}

	return response.json();
}
