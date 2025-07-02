import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import SpecialistList from "@/features/patient/discover/components/SpecialistList";
import DoctorList from "@/features/patient/discover/components/DoctorList";
import MedicineList from "@/features/patient/discover/components/MedicineList";
import BottomBar from "@/shared/components/BottomBar";
import UserInfo from "@/features/patient/discover/components/UserInfo";
import LayoutMobile from "@/shared/components/layout-mobile";

export const metadata: Metadata = {
	title: "Better Hospital - Home",
};

export default async function HomePage() {
	return (
		<LayoutMobile>
			<main className="flex flex-col flex-1">
				<div className="flex py-6 px-5">
					<Link href="#">
						<img
							src="/assets/images/backgrounds/banner-full.webp"
							className="size-full"
							alt="banner"
						/>
					</Link>
				</div>
				<Suspense fallback={<>Loading...</>}>
					<SpecialistList />
				</Suspense>
				<Suspense>
					<DoctorList />
				</Suspense>
				<MedicineList />
			</main>
		</LayoutMobile>
	);
}
