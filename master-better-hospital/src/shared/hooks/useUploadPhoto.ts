import { type ChangeEvent, useRef, useState } from "react";

const useUploadPhoto = (defaultVal: string) => {
	const [photo, setPhoto] = useState<string>(defaultVal);

	const uploadRef = useRef<HTMLInputElement>(null);

	const handleChoosePhoto = () => {
		uploadRef.current?.click();
	};

	const handleChangePhoto = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPhoto(URL.createObjectURL(e.target.files[0]));
		}
	};

	return {
		photo,
		handleChangePhoto,
		handleChoosePhoto,
		uploadRef,
	};
};

export default useUploadPhoto;
