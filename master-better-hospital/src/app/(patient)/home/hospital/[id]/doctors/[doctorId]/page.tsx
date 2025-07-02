import React from "react";
import type { Metadata } from "next";
import ViewDoctorDetail from "@/features/patient/hospital-detail/components/ViewDoctorDetail";

export const metadata: Metadata = {
	title: "Hospital Doctor Detail",
};

export default async function HospitalDoctorDetailPage({
	params,
}: { params: Promise<{ id: string; doctorId: string }> }) {
	const { doctorId, id } = await params;

	return <ViewDoctorDetail hospitalId={id} doctorId={doctorId} />;
}
