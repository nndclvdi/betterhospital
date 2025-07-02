import supabase, { BUCKET_NAME } from "../libs/supabase";

type UserType = "specialist" | "doctors" | "hospitals" | "patients" | "payment";

export const uploadImage = async (
	file: File,
	type: UserType,
	upsert = false,
) => {
	const ext = file.type.split("/")[1];
	const filename = `${type}-${Date.now()}.${ext}`;

	try {
		const { error } = await supabase.storage
			.from(BUCKET_NAME)
			.upload(`public/${type}/${filename}`, file, {
				cacheControl: "3600",
				upsert,
			});

		if (error) {
			throw new Error("Failed to upload image");
		}

		return filename;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getImageUrl = (filename: string, type: UserType) => {
	const { data } = supabase.storage
		.from(BUCKET_NAME)
		.getPublicUrl(`public/${type}/${filename}`);

	return data.publicUrl;
};
