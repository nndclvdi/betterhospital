"use client"

import React, { useActionState, type ReactNode } from "react";
import { managerLogout } from "../actions/auth";

interface TopbarProps {
	children: ReactNode;
}

export default function Topbar({ children }: TopbarProps) {
	const [state, formAction, isPending] = useActionState(managerLogout, null)

	return (
		<div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
			<div className="flex items-center gap-6 h-[102px] bg-white w-full rounded-3xl p-[18px]">
				{children}
			</div>
			<div className="flex items-center gap-3 h-[102px] bg-white w-fit rounded-3xl p-[18px]">
				<div className="flex rounded-full overflow-hidden size-14">
					<img
						src="/assets/images/photos/photo-1.png"
						className="size-full object-cover"
						alt="phot"
					/>
				</div>
				<div className="flex flex-col gap-[6px] min-w-[155px] w-fit">
					<p className="font-semibold text-lg leading-tight">Nobilo Reyno</p>
					<p className="flex items-center gap-1 font-semibold text-monday-gray text-lg leading-none">
						<img
							src="/assets/images/icons/user-grey.svg"
							className="size-[18px]"
							alt="icon"
						/>
						Manager
					</p>
				</div>
				<form action={formAction}>
					<button type="submit" disabled={isPending} className="flex w-6">
					<img
						src="/assets/images/icons/logout.svg"
						className="flex size-6 shrink-0"
						alt="icon"
					/>
				</button>
				</form>
			</div>
		</div>
	);
}
