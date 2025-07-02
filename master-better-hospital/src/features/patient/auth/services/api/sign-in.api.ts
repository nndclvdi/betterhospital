import { SIGN_IN_API } from "@/shared/constants/uri-be-page";
import type { SignInValues } from "../../helpers/schema";

export async function signInApi(body: SignInValues) {
	const response = await fetch(SIGN_IN_API, {
		method: "POST",
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error("Failed to create doctor");
	}

	return response.json();
}
