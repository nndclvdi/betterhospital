import React from "react";
import type { Metadata } from "next";
import ViewCheckoutFinished from "@/features/patient/checkout/components/ViewCheckoutFinished";
import type { Params } from "@/shared/types/params";

export const metadata: Metadata = {
	title: "Checkout Success",
};

export default async function SuccessCheckoutPage({ params }: Params) {
	const { id } = await params;

	return <ViewCheckoutFinished id={id} />;
}
