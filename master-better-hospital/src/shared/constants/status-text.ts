import type { TransactionStatus } from "../../../generated/prisma";

export const StatusText: Record<TransactionStatus, string> = {
	PENDING: "Waiting",
	FAILED: "Rejected",
	SUCCESS: "Approved",
};

export const StatusBgColor: Record<TransactionStatus, string> = {
	FAILED: "bg-monday-red/10",
	PENDING: "bg-monday-orange/10",
	SUCCESS: "bg-monday-green/10",
};


export const StatusTextColor: Record<TransactionStatus, string> = {
	FAILED: "text-monday-red",
	PENDING: "text-monday-orange",
	SUCCESS: "text-monday-green",
};