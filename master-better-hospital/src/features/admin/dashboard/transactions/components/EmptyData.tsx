import React from "react";

export default function EmptyData() {
	return (
		<div
			id="Empty-State"
			className="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-stroke gap-8"
		>
			<img
				src="/assets/images/icons/note-remove-grey.svg"
				className="size-[52px]"
				alt="icon"
			/>
			<div className="flex flex-col gap-1 items-center text-center">
				<p className="font-semibold text-monday-gray">
					Oops, you don't have any data yet
				</p>
			</div>
		</div>
	);
}
