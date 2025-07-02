import Link from "next/link";
import React from "react";
import { getSpecialist } from "../services/discoverService";
import SpecialistCard from "./SpecialistCard";
import { BROWSE_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";

export default async function SpecialistList() {
	const data = await getSpecialist(4);

	return (
		<div
			id="Browse-Specialist"
			className="flex flex-col w-full p-5 gap-4 bg-white"
		>
			<div className="flex items-center justify-between">
				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-lg">Browse Specialist</h2>
					<p className="font-semibold text-sm text-monday-gray leading-none">
						Find Our Expert Doctors
					</p>
				</div>
				<Link
					href={BROWSE_SPECIALIST_PAGE}
					className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
				>
					VIEW ALL
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-4">
				{data.map((val) => (
					<SpecialistCard key={val.id} data={val} />
				))}
			</div>
		</div>
	);
}
