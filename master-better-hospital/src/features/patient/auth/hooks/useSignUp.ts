import { useMutation } from "@tanstack/react-query";
import { signUpApi } from "../services/api/sign-up.api";

const useSignUp = () => {
	const { mutateAsync, isPending, isError, error } = useMutation({
		mutationFn: (formData: FormData) => signUpApi(formData),
	});

	return {
		mutateAsync,
		isPending,
		isError,
		error,
	};
};

export default useSignUp;
