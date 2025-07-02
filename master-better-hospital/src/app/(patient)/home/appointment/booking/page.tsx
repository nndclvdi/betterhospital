import React from "react";
import type { Metadata } from "next";
import ViewCheckout from "@/features/patient/checkout/components/ViewCheckout";

export const metadata: Metadata = {
	title: "Booking Appointment",
};

export default function BookingAppointmentPage() {
	return <ViewCheckout />;
}
