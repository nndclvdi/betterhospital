"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
	BASE_URI_ADMIN_PAGE,
	MANAGER_DOCTORS_PAGE,
	MANAGER_HOSPITALS_PAGE,
	MANAGER_SPECIALIST_PAGE,
	MANAGER_TRANSACTIONS_PAGE,
} from "../constants/uri-fe-page";

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="relative flex h-auto w-[280px] shrink-0 bg-white">
			<div className="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px]">
				<img
					src="/assets/images/logos/logo.svg"
					className="h-8 w-fit"
					alt="logo"
				/>
				<div className="flex flex-col gap-5 mb-5 overflow-y-scroll hide-scrollbar h-full overscroll-contain">
					<nav className="flex flex-col gap-4">
						<p className="font-medium text-monday-gray">Main Menu</p>
						<ul className="flex flex-col gap-2">
							<li
								className={`group ${pathname === BASE_URI_ADMIN_PAGE ? "active" : ""}`}
							>
								<Link
									href={BASE_URI_ADMIN_PAGE}
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/home-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/home-blue.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Overview
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
							<li
								className={`group ${pathname.includes(MANAGER_SPECIALIST_PAGE) ? "active" : ""}`}
							>
								<Link
									href={MANAGER_SPECIALIST_PAGE}
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/stetoscop-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/stetoscop-blue.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Specialist
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
							<li
								className={`group ${pathname.includes(MANAGER_HOSPITALS_PAGE) ? "active" : ""}`}
							>
								<Link
									href={MANAGER_HOSPITALS_PAGE}
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/hospital-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/hospital-blue.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Hospitals
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
							<li
								className={`group ${pathname.includes(MANAGER_TRANSACTIONS_PAGE) ? "active" : ""}`}
							>
								<Link
									href={MANAGER_TRANSACTIONS_PAGE}
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/note-2-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/note-2-blue.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Transactions
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
						</ul>
					</nav>
					<nav className="flex flex-col gap-4">
						<p className="font-medium text-monday-gray">Account Settings</p>
						<ul className="flex flex-col gap-2">
							<li
								className={`group ${pathname.includes(MANAGER_DOCTORS_PAGE) ? "active" : ""}`}
							>
								<Link
									href={MANAGER_DOCTORS_PAGE}
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/profile-2user-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/profile-2user-blue.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Doctors
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
							<li className="group flex flex-col">
								<button
									type="button"
									data-expand="Manage-Users-Accordion"
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/user-square-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full text-left">
										Manage User
									</p>
									<img
										src="/assets/images/icons/arrow-circle-up.svg"
										className="size-6 flex shrink-0 transition-300"
										alt="icon"
									/>
								</button>
								<div id="Manage-Users-Accordion" className="flex">
									<div className="flex w-[56px] shrink-0 justify-end items-start">
										<img
											src="/assets/images/icons/accordion-branch.svg"
											className="w-[28px]"
											alt="icon"
										/>
									</div>
									<ul className="flex flex-col gap-1 w-full">
										<li className="group">
											<a
												href="manage-roles.html"
												className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
											>
												<div className="relative flex size-6 shrink-0">
													<img
														src="/assets/images/icons/profile-tick-black.svg"
														className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
														alt="icon"
													/>
													<img
														src="/assets/images/icons/profile-tick-blue.svg"
														className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
														alt="icon"
													/>
												</div>
												<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
													Roles
												</p>
												<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
											</a>
										</li>
										<li className="group">
											<a
												href="manage-users.html"
												className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
											>
												<div className="relative flex size-6 shrink-0">
													<img
														src="/assets/images/icons/profile-black.svg"
														className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
														alt="icon"
													/>
													<img
														src="/assets/images/icons/profile-blue.svg"
														className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
														alt="icon"
													/>
												</div>
												<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
													Users
												</p>
												<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li className="group">
								<Link
									href="#"
									className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 group-[&.active]:bg-monday-blue/10 transition-300"
								>
									<div className="relative flex size-6 shrink-0">
										<img
											src="/assets/images/icons/setting-black.svg"
											className="size-6 absolute opacity-100 group-[&.active]:opacity-0 transition-300"
											alt="icon"
										/>
										<img
											src="/assets/images/icons/setting-black.svg"
											className="size-6 absolute opacity-0 group-[&.active]:opacity-100 transition-300"
											alt="icon"
										/>
									</div>
									<p className="font-medium group-[&.active]:text-monday-blue transition-300 w-full">
										Settings
									</p>
									<div className="w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden group-[&.active]:flex transition-300" />
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</aside>
	);
}
