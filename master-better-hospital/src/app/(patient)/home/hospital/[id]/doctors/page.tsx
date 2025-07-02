import React from "react";
import type { Metadata } from "next";
import type { Params } from "@/shared/types/params";
import HospitalDoctorsView from "@/features/patient/hospital-detail/components/ViewDoctors";

export const metadata: Metadata = {
	title: "Hospital Doctors",
};

export default async function HospitalDetailDoctors({ params }: Params) {
	const { id } = await params;
	return <HospitalDoctorsView id={id} />;
}
