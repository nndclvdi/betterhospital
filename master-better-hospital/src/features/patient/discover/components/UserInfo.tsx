import { getUser } from "@/shared/libs/session";
import { getImageUrl } from "@/shared/utils/image";
import Link from "next/link";
import React from "react";

export default async function UserInfo() {
	const user = await getUser("PATIENT");

	return (
		<div
			id="Top-Nav"
			className="flex items-center justify-between h-[112px] w-full p-5 pt-8 bg-white"
		>
			<div className="flex items-center w-full gap-2">
				<Link href="mobile-profile.html">
					<div className="relative flex size-[60px] shrink-0 items-center justify-center">
						<div
							id="Avatar-Container"
							className="flex size-full rounded-full overflow-hidden border-[3px] border-white ring-2 ring-monday-blue bg-monday-background"
						>
							<img
								src={getImageUrl(user?.photo ?? "", "patients")}
								className="size-full object-cover"
								alt="avatar"
							/>
						</div>
						<p className="absolute transform -translate-x-1/2 left-1/2 -bottom-[2px] flex items-center gap-0.5 h-5 w-12 rounded-[20px] py-1 px-2 bg-monday-blue">
							<img
								src="/assets/images/icons/crown-white-fill.svg"
								className="flex size-3 shrink-0"
								alt="icon"
							/>
							<span className="font-extrabold text-[8px] text-white leading-none">
								PRO
							</span>
						</p>
					</div>
				</Link>
				<div className="flex flex-col gap-[6px]">
					<p className="font-bold">{user?.name}</p>
					<p className="flex items-center gap-0.5">
						<img
							src="/assets/images/icons/location-rounded-grey-fill.svg"
							className="flex size-4 shrink-0"
							alt="icon"
						/>
						<span className="font-semibold text-sm leading-none text-monday-gray text-nowrap">
							Malang, Indonesia
						</span>
						<img
							src="/assets/images/icons/arrow-down-grey-thick.svg"
							className="flex size-3 shrink-0"
							alt="icon"
						/>
					</p>
				</div>
			</div>
			<Link href="#" className="flex size-12 shrink-0">
				<img
					src="/assets/images/icons/notification-circle.svg"
					className="size-12"
					alt="icon"
				/>
			</Link>
		</div>
	);
}
