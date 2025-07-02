import Link from "next/link";
import React from "react";

export default function DoctorTestimony() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="font-bold">Happy Customer</h2>
				<Link
					href="mobile-browse-specialist.html"
					className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
				>
					VIEW ALL
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				<div className="card flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
					<div className="flex items-center gap-5">
						<div className="flex items-center gap-3 w-full">
							<div className="flex size-[62px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
								<img
									src="/assets/images/photos/reviewer-1.png"
									className="size-full object-cover"
									alt="icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px] w-full">
								<p className="font-semibold">Neybila Rayna</p>
								<div className="flex items-center gap-0.5 text-nowrap">
									<img
										src="/assets/images/icons/woman-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-medium text-monday-gray leading-none">
										Female
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange/10 py-[6px] px-[10px] gap-0.5">
							<img
								src="/assets/images/icons/star-sliced.svg"
								className="flex size-5 shrink-0"
								alt="icon"
							/>
							<p className="font-semibold leading-none text-monday-orange">
								5.0
							</p>
						</div>
					</div>
					<hr className="border border-monday-stroke" />
					<p className="font-medium text-monday-gray leading-[1.6em]">
						“Quick and easy appointment! Dr. Momo Sunchiko was professional, and
						the staff made me feel comfortable. Highly recommend!"
					</p>
				</div>
				<div className="card flex flex-col rounded-2xl border border-monday-stroke  p-4 bg-white gap-4">
					<div className="flex items-center gap-5">
						<div className="flex items-center gap-3 w-full">
							<div className="flex size-[62px] rounded-2xl bg-monday-background overflow-hidden shrink-0">
								<img
									src="/assets/images/photos/reviewer-2.png"
									className="size-full object-cover"
									alt="icon"
								/>
							</div>
							<div className="flex flex-col gap-[6px] w-full">
								<p className="font-semibold">Alexander Win</p>
								<div className="flex items-center gap-0.5 text-nowrap">
									<img
										src="/assets/images/icons/man-grey.svg"
										className="flex size-5 shrink-0"
										alt="icon"
									/>
									<p className="font-medium text-monday-gray leading-none">
										Male
									</p>
								</div>
							</div>
						</div>
						<div className="flex items-center rounded-full w-fit h-fit shrink-0 bg-monday-orange/10 py-[6px] px-[10px] gap-0.5">
							<img
								src="/assets/images/icons/star-sliced.svg"
								className="flex size-5 shrink-0"
								alt="icon"
							/>
							<p className="font-semibold leading-none text-monday-orange">
								5.0
							</p>
						</div>
					</div>
					<hr className="border border-monday-stroke" />
					<p className="font-medium text-monday-gray leading-[1.6em]">
						"Excellent service! Dr. Raze Invoker was attentive and thorough. The
						clinic was clean, and the staff were friendly. Highly recommend for
						in-person care!"
					</p>
				</div>
			</div>
		</div>
	);
}
