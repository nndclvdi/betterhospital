import React from "react";
import type { Metadata } from "next";
import HospitalDetailView from "@/features/patient/hospital-detail/components/ViewDetail";
import type { Params } from "@/shared/types/params";

export const metadata: Metadata = {
	title: "Detail Hospital",
};

export default async function HospitalDetailPage({ params }: Params) {
	const { id } = await params;
	return <HospitalDetailView id={id} />;
}
