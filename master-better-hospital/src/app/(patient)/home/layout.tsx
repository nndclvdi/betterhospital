import { SESSION_DETAIL } from "@/shared/constants/session";
import { verifySession } from "@/shared/libs/session";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		template: "Better Hospital - %s",
		default: "Home", // a default is required when creating a template
	},
};

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await verifySession("PATIENT");

	return <>{children}</>;
}
