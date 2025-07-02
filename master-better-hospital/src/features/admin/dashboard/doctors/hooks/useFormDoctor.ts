import { useMutation } from "@tanstack/react-query";
import { createDoctor, updateDoctor } from "../services/api/doctor.api";

type Props = {
	type: "ADD" | "EDIT";
	id: string;
};

export const useFormDoctor = (props: Props) => {
	const { mutateAsync, isPending, isError, error } = useMutation({
		mutationFn: (formData: FormData) =>
			props.type === "ADD"
				? createDoctor(formData)
				: updateDoctor(formData, props.id),
	});

	return {
		mutateAsync,
		isPending,
		isError,
		error,
	};
};

export default useFormDoctor;
