"use client";

import Link from "next/link";
import React from "react";
import {
	HOME_PAGE,
	INBOX_PAGE,
	ORDERS_PAGE,
	SETTINGS_PAGE,
} from "../constants/uri-fe-page";
import { usePathname } from "next/navigation";

export default function BottomBar() {
	const pathname = usePathname();

	return (
		<div id="Menu-Bar" className="flex relative h-[100px] w-full">
			<div className="fixed bottom-0 z-30 h-[100px] w-full max-w-[640px] grid grid-cols-2 gap-4 items-center">
				<div className="backdrop absolute flex justify-center w-full h-full drop-shadow-2xl">
					<img
						src="/assets/images/backgrounds/Subtract-menu-bar.svg"
						className="h-full"
						alt="ic"
					/>
					<div className="absolute h-full w-1/3 bg-white left-0 border-t border-monday-stroke" />
					<div className="absolute h-full w-1/3 bg-white right-0 border-t border-monday-stroke" />
				</div>
				<div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
					<Link
						href={HOME_PAGE}
						className={`group menu ${pathname === HOME_PAGE ? "active" : ""}`}
					>
						<div className="flex flex-col h-full items-center gap-2 pt-6">
							<img
								src="/assets/images/icons/home-grey-fill-opacity.svg"
								className="flex size-6 shrink-0 group-[.active]:hidden"
								alt="icon"
							/>
							<img
								src="/assets/images/icons/home-blue-fill-opacity.svg"
								className="size-6 shrink-0 hidden group-[.active]:flex"
								alt="icon"
							/>
							<span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
								Home
							</span>
							<img
								src="/assets/images/icons/menu-active-icon.svg"
								className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
								alt="active"
							/>
						</div>
					</Link>
					<Link
						href={ORDERS_PAGE}
						className={`group menu ${pathname.includes(ORDERS_PAGE) ? "active" : ""}`}
					>
						<div className="flex flex-col h-full items-center gap-2 pt-6">
							<img
								src="/assets/images/icons/stickynote-grey-fill-opacity.svg"
								className="flex size-6 shrink-0 group-[.active]:hidden"
								alt="icon"
							/>
							<img
								src="/assets/images/icons/stickynote-blue-fill-opacity.svg"
								className="size-6 shrink-0 hidden group-[.active]:flex"
								alt="icon"
							/>
							<span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
								Orders
							</span>
							<img
								src="/assets/images/icons/menu-active-icon.svg"
								className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
								alt="active"
							/>
						</div>
					</Link>
				</div>
				<Link
					href="#"
					className="flex size-[60px] shrink-0 absolute transform -translate-x-1/2 left-1/2 -top-[30px]"
				>
					<img
						src="/assets/images/icons/Nav.svg"
						className="size-full object-contain"
						alt="icon"
					/>
				</Link>
				<div className="relative grid grid-cols-2 justify-evenly pr-[30px] h-full px-6">
					<Link
						href="#"
						className={`group menu ${pathname.includes(INBOX_PAGE) ? "active" : ""}`}
					>
						<div className="flex flex-col h-full items-center gap-2 pt-6">
							<img
								src="/assets/images/icons/direct-inbox-grey-fill-opacity.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
							<span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
								Inbox
							</span>
							<img
								src="/assets/images/icons/menu-active-icon.svg"
								className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
								alt="active"
							/>
						</div>
					</Link>
					<Link
						href={SETTINGS_PAGE}
						className={`group menu ${pathname.includes(SETTINGS_PAGE) ? "active" : ""}`}
					>
						<div className="flex flex-col h-full items-center gap-2 pt-6">
							<img
								src="/assets/images/icons/setting-2-grey-fill-opacity.svg"
								className="flex size-6 shrink-0"
								alt="icon"
							/>
							<span className="font-semibold leading-none text-monday-gray group-[&.active]:text-monday-blue">
								Settings
							</span>
							<img
								src="/assets/images/icons/menu-active-icon.svg"
								className="mt-auto mb-0 mx-auto hidden group-[&.active]:flex"
								alt="active"
							/>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
