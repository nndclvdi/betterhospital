import OrderCard from "@/features/patient/orders/components/OrderCard";
import LayoutMobile from "@/shared/components/layout-mobile";
import { getOrders } from "@/features/patient/orders/services/get-orders";
import EmptyOrder from "@/features/patient/orders/components/EmptyOrder";

export default async function OrderPage() {
	const orders = await getOrders();

	return (
		<LayoutMobile>
			<main className="flex flex-col flex-1">
				<div className="flex flex-col w-full p-5 gap-4 bg-white mb-5 mt-2 flex-1">
					<div className="flex flex-col gap-1">
						<p className="font-bold text-2xl">My Orders</p>
						<p className="font-semibold text-sm leading-none text-monday-gray">
							{orders.length} Total Orders
						</p>
					</div>
					{orders.length > 0 ? (
						<div className="flex flex-col gap-4">
							{orders.map((order) => (
								<OrderCard data={order} key={order.id} />
							))}
						</div>
					) : (
						<EmptyOrder />
					)}
				</div>
			</main>
		</LayoutMobile>
	);
}
