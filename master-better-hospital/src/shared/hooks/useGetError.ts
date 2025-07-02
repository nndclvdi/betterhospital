import type { FormState } from "../types/formState";

const useGetError = (state: FormState) => {
	const isInputError = (key: string) => {
		if (!state.errors) {
			return false;
		}

		return !!state.errors.find((err) => err.path[0] === key);
	};

	const getMessageError = (key: string) => {
		if (!state.errors) {
			return null;
		}

		return state.errors.find((err) => err.path[0] === key)?.message;
	};

	return { isInputError, getMessageError };
};

export default useGetError;
