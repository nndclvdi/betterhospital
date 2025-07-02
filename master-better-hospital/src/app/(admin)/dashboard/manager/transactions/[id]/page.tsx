import ViewTransactionDetail from "@/features/admin/dashboard/transactions/components/ViewTransactionDetail";
import { getTransaction } from "@/features/admin/dashboard/transactions/services/get-transaction";
import { MANAGER_TRANSACTIONS_PAGE } from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Transaction Details",
};

export default async function DashboardManagerTransactionDetail({
	params,
}: Params) {
	const { id } = await params;
	const data = await getTransaction(id);

	if (!data) {
		return redirect(MANAGER_TRANSACTIONS_PAGE);
	}

	return <ViewTransactionDetail data={data} />;
}
