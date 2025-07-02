"use client";

import Link from "next/link";
import React from "react";
import type { Specialist } from "../../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";
import FormDeleteAssign from "./FormDeleteAssign";
import { MANAGER_HOSPITALS_ASSIGN_PAGE } from "@/shared/constants/uri-fe-page";

interface SpecialistsProps {
	data: Pick<Specialist, "id" | "photo" | "name">[];
	hospitalId: string;
}

export default function SpecialLists({ data, hospitalId }: SpecialistsProps) {
	return (
		<section
			id="Specialist-List"
			className="flex flex-col h-full w-full rounded-[20px] p-5 gap-6 bg-white"
		>
			<p className="header font-semibold text-xl">Specialist List</p>
			<Link
				href={MANAGER_HOSPITALS_ASSIGN_PAGE(hospitalId)}
				className="btn btn-primary font-semibold text-lg w-full"
			>
				Assign Specialist
				<img
					src="/assets/images/icons/add-white.svg"
					className="flex sixe-6 shrink-0"
					alt="icon"
				/>
			</Link>
			{data.length > 0 ? (
				<div className="flex flex-col gap-6">
					{data.map((item) => (
						<React.Fragment key={item.id}>
							<div className="card flex items-center gap-4 w-full shrink-0">
								<div className="flex size-[92px] rounded-2xl bg-monday-gray-background overflow-hidden shrink-0 p-[10px]">
									<img
										src={getImageUrl(item.photo, "specialist")}
										className="size-full object-cover"
										alt="icon"
									/>
								</div>
								<div className="flex flex-col gap-[6px] flex-1">
									<p className="font-semibold text-xl">{item.name}</p>
									<div className="flex items-center gap-1 w-[164px] shrink-0">
										<img
											src="/assets/images/icons/verify-blue-fill.svg"
											className="size-6 flex shrink-0"
											alt="icon"
										/>
										<p className="font-semibold text-lg text-nowrap text-monday-blue">
											Certified
										</p>
									</div>
								</div>
								<FormDeleteAssign
									hospitalId={hospitalId}
									hospitalSpecialistId={item.id}
								/>
							</div>
							<hr className="border-monday-stroke last:hidden" />
						</React.Fragment>
					))}
				</div>
			) : (
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
						<Link
							href={MANAGER_HOSPITALS_ASSIGN_PAGE(hospitalId)}
							className="font-bold text-monday-blue"
						>
							Add Now +
						</Link>
					</div>
				</div>
			)}
		</section>
	);
}
