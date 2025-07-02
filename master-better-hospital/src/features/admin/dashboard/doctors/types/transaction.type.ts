import type {
	TransactionStatus,
	User,
} from "../../../../../../generated/prisma";

export type Transaction = {
	id: string;
	user: Pick<User, "name" | "photo" | "gender">;
	date: Date;
	status: TransactionStatus;
};
