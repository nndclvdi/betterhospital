import React from "react";

interface Props {
	name: string;
}

export default function SpecialistDetailCard() {
	return (
		<div className="flex flex-col gap-[6px]">
			<p className="font-semibold text-lg line-clamp-1">{data.name}</p>
			<div className="flex items-center gap-1 text-nowrap">
				<img
					src="/assets/images/icons/profile-2user-grey.svg"
					className="flex size-5 shrink-0"
					alt="icon"
				/>
				<p className="font-semibold text-monday-gray leading-none">
					28 Doctors
				</p>
			</div>
		</div>
	);
}
