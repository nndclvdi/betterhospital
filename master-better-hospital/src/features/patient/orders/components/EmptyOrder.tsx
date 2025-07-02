import Link from "next/link";
import React from "react";

export default function EmptyOrder() {
	return (
		<div
			id="Empty-State"
			className="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] p-[10px] gap-8"
		>
			<img
				src="/assets/images/icons/note-remove-grey.svg"
				className="size-[52px]"
				alt="icon"
			/>
			<div className="flex flex-col gap-1 items-center text-center">
				<p className="font-semibold text-monday-gray text-lg">
					Oops, you don't have any data yet
				</p>
				<Link href="#" className="font-bold text-monday-blue leading-none">
					Make Appointment +
				</Link>
			</div>
		</div>
	);
}
