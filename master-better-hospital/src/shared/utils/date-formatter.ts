import dayjs from "dayjs";

export const dateFormat = (date: Date | string, format = "DD MMM YYYY") => {
	if (!date) {
		return dayjs().format(format);
	}

	return dayjs(date).format(format);
};
