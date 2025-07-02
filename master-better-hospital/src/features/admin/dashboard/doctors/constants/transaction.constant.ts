import type { TransactionStatus } from "../../../../../../generated/prisma";

export const STATUS_COLOR: Record<TransactionStatus, string> = {
	SUCCESS: "bg-monday-green",
	FAILED: "bg-monday-red",
	PENDING: "bg-monday-orange",
};

export const STATUS_TEXT: Record<TransactionStatus, string> = {
	FAILED: "Rejected",
	PENDING: "Waiting",
	SUCCESS: "Approved",
};
