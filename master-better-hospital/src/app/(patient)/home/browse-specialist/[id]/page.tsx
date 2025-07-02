import BrowseHospitalView from "@/features/patient/browse-hospital/components/view";
import { getHospitalSpecialist } from "@/features/patient/discover/services/discoverService";
import { BROWSE_SPECIALIST_PAGE } from "@/shared/constants/uri-fe-page";
import type { Params } from "@/shared/types/params";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Hospital Specialist",
};

export default async function BrowseSpecialistDetail({ params }: Params) {
	const { id } = await params;
	const data = await getHospitalSpecialist(id);

	if (!data) {
		return redirect(BROWSE_SPECIALIST_PAGE);
	}

	return <BrowseHospitalView data={data} />;
}
