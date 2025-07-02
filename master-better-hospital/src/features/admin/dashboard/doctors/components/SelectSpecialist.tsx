import React from "react";
import useLovSpecialist from "../hooks/useLovSpecialist";
import { useFormContext } from "react-hook-form";
import type { CreateDoctorValues } from "../helpers/schema";

export default function SelectSpecialist() {
	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext<CreateDoctorValues>();

	const hospital_id = watch("hospital_id");
	const specialist_id = watch("specialist_id");

	const { data, isLoading } = useLovSpecialist(hospital_id ?? "");

	return (
		<div className="flex items-center justify-between">
			<p className="font-medium text-lg text-monday-gray">Select Specialist</p>
			<div className="group/errorState flex flex-col gap-2">
				<label className="group relative rounded-3xl border-[1.5px] border-monday-border focus-within:border-monday-black transition-300 overflow-hidden w-[500px] group-[&.invalid]/errorState:border-monday-red">
					<div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
						<img
							src="/assets/images/icons/stetoscop-grey.svg"
							className="flex size-6 shrink-0"
							alt="icon"
						/>
					</div>
					<p className="placeholder font-medium text-lg absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:invalid]:top-[36px] group-has-[:valid]:text-sm group-has-[:valid]:text-monday-gray group-focus-within:top-[25px] transition-300">
						Select Specialist
					</p>
					<select
						className="appearance-none w-full h-[72px] font-semibold text-lg outline-none pl-20 pr-6 pb-[14.5px] pt-[32px]"
						value={specialist_id}
						{...register("specialist_id")}
					>
						<option hidden />
						{data?.map((item) => (
							<option key={item.specialist.id} value={item.specialist.id}>
								{item.specialist.name}
							</option>
						))}
					</select>
					<img
						src="/assets/images/icons/arrow-down-black.svg"
						className="absolute transform -translate-y-1/2 top-1/2 right-6 size-6"
						alt="icon"
					/>
				</label>
				{errors.specialist_id && (
					<span className="font-semibold text-lg text-monday-red  leading-none">
						{errors.specialist_id.message}
					</span>
				)}
			</div>
		</div>
	);
}
