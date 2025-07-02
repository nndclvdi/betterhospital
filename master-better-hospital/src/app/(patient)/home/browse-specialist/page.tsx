import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSpecialist } from "@/features/patient/discover/services/discoverService";
import SpecialistCard from "@/features/patient/discover/components/SpecialistCard";

export const metadata: Metadata = {
	title: "Browse Specialist",
};

export default async function BrowseSpecialistPage() {
	const data = await getSpecialist();

	return (
		<div id="Mobile-Body" className="flex flex-col flex-1 bg-[#dae1e9] min-w-0">
			<div
				id="Content-Container"
				className="flex flex-col min-h-screen w-full max-w-[640px] mx-auto bg-monday-background"
			>
				<div id="Top-Nav" className="flex relative w-full h-[128px]">
					<div className="fixed z-30 top-0 w-full max-w-[640px] px-5 pt-8">
						<div className="flex items-center justify-between h-[76px] bg-white rounded-2xl p-4 gap-5 drop-shadow-sm">
							<Link
								href="mobile-discover.html"
								className="size-11 flex shrink-0"
							>
								<img
									src="/assets/images/icons/mobile-back-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
							<h1 className="font-bold text-lg leading-none text-center">
								Browse Specialist
							</h1>
							<Link href="#" className="size-11 flex shrink-0">
								<img
									src="/assets/images/icons/mobile-more-button.svg"
									className="size-full"
									alt="icon"
								/>
							</Link>
						</div>
					</div>
				</div>
				<main className="flex flex-col flex-1">
					<div
						id="Choose-Specialist"
						className="flex flex-col w-full flex-1 p-5 gap-4 bg-white"
					>
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-1">
								<h2 className="font-bold text-lg">Choose a Specialist</h2>
								<div className="flex items-center gap-1 text-nowrap">
									<img
										src="/assets/images/icons/stetoscop-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-semibold text-monday-gray leading-none">
										{data.length} Total Speciliast
									</p>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{data.map((val) => (
								<SpecialistCard key={val.id} data={val} />
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
