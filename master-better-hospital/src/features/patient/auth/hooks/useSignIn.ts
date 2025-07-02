import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../services/api/sign-in.api";
import type { SignInValues } from "../helpers/schema";

const useSignIn = () => {
	const { mutateAsync, isPending, isError, error } = useMutation({
		mutationFn: (formData: SignInValues) => signInApi(formData),
	});

	return {
		mutateAsync,
		isPending,
		isError,
		error,
	};
};

export default useSignIn;
