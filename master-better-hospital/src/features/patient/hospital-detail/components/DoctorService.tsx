import Link from "next/link";
import React from "react";

export default function DoctorService() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h2 className="font-bold">Why Choose Me</h2>
				<Link
					href="mobile-browse-specialist.html"
					className="rounded-full border border-monday-stroke py-3 px-4 font-bold text-xs leading-none text-monday-gray"
				>
					VIEW ALL
				</Link>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="card flex flex-col items-center text-center rounded-2xl border border-monday-orange py-6 px-4 bg-monday-orange/10 gap-4">
					<img
						src="/assets/images/icons/clipboard-tick-orange.svg"
						className="flex size-9 shrink-0"
						alt="icon"
					/>
					<div className="flex flex-col gap-0.5">
						<p className="font-bold text-lg text-monday-orange">Guarantee</p>
						<p className="font-medium text-sm text-monday-orange leading-none">
							Trusted Doctor
						</p>
					</div>
				</div>
				<div className="card flex flex-col items-center text-center rounded-2xl border border-monday-cyan py-6 px-4 bg-monday-cyan/10 gap-4">
					<img
						src="/assets/images/icons/verify-cyan-fill.svg"
						className="flex size-9 shrink-0"
						alt="icon"
					/>
					<div className="flex flex-col gap-0.5">
						<p className="font-bold text-lg text-monday-cyan">Certification</p>
						<p className="font-medium text-sm text-monday-cyan leading-none">
							Licensed Doctor
						</p>
					</div>
				</div>
				<div className="card flex flex-col items-center text-center rounded-2xl border border-monday-light-green py-6 px-4 bg-monday-light-green/10 gap-4">
					<img
						src="/assets/images/icons/lovely-light-green-fill.svg"
						className="flex size-9 shrink-0"
						alt="icon"
					/>
					<div className="flex flex-col gap-0.5">
						<p className="font-bold text-lg text-monday-light-green">
							Patient Care
						</p>
						<p className="font-medium text-sm text-monday-light-green leading-none">
							Personal Care
						</p>
					</div>
				</div>
				<div className="card flex flex-col items-center text-center rounded-2xl border border-monday-purple py-6 px-4 bg-monday-purple/10 gap-4">
					<img
						src="/assets/images/icons/timer-purple-fill.svg"
						className="flex size-9 shrink-0"
						alt="icon"
					/>
					<div className="flex flex-col gap-0.5">
						<p className="font-bold text-lg text-monday-purple">
							Timely Service
						</p>
						<p className="font-medium text-sm text-monday-purple leading-none">
							On-Time Schedule
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
