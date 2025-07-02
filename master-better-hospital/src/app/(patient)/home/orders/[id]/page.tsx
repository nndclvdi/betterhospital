import ViewOrderDetail from "@/features/patient/orders/components/ViewOrderDetail";
import { getOrder } from "@/features/patient/orders/services/get-order";
import { ORDERS_PAGE } from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Order Detail",
};

export default async function OrderDetailPage({ params }: Params) {
	const { id } = await params;
	const order = await getOrder(id);

	if (!order) {
		return redirect(ORDERS_PAGE);
	}

	return <ViewOrderDetail order={{ ...order, total: Number(order.total) }} />;
}
