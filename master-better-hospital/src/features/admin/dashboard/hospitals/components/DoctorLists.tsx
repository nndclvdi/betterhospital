import React from "react";
import type { Doctor } from "../../../../../../generated/prisma";
import { getImageUrl } from "@/shared/utils/image";

type IDoctor = Pick<Doctor, "id" | "name" | "photo"> & { specialist: string };

interface DoctorListsProps {
	data: IDoctor[];
}

export default function DoctorLists({ data }: DoctorListsProps) {
	return (
		<section
			id="Doctor-List"
			className="flex flex-col h-full w-[calc((440/960)*100%)] shrink-0 rounded-[20px] p-5 gap-5 bg-white"
		>
			<p className="header font-semibold text-xl">Doctors List</p>
			{data.length > 0 ? (
				<div className="flex flex-col gap-5">
					<hr className="border-monday-stroke last:hidden" />
					{data.map((item) => (
						<React.Fragment key={item.id}>
							<div className="card flex items-center gap-4 w-full shrink-0">
								<div className="flex size-[92px] rounded-full bg-monday-background overflow-hidden shrink-0">
									<img
										src={getImageUrl(item.photo, "doctors")}
										className="size-full object-cover"
										alt="icon"
									/>
								</div>
								<div className="flex flex-col gap-[6px] flex-1">
									<p className="font-semibold text-xl w-[304px] truncate">
										{item.name}
									</p>
									<p className="flex items-center gap-1 font-medium text-monday-gray text-lg leading-none">
										<img
											src="/assets/images/icons/stetoscop-grey.svg"
											className="size-5"
											alt="icon"
										/>
										{item.specialist}
									</p>
								</div>
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
					</div>
				</div>
			)}
		</section>
	);
}
