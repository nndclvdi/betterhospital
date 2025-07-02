import prisma from "@/shared/libs/prisma";
import { formatResponse } from "@/shared/utils/response";
import { schemaApproval } from "@/shared/utils/schema";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const data = schemaApproval.safeParse(body);

		if (!data.success) {
			return NextResponse.json(
				formatResponse({
					success: false,
					message: "Bad Request",
					data: data.error.errors,
				}),
				{ status: 400 },
			);
		}

		const { id, isApproved } = data.data;

		const order = await prisma.transaction.findFirst({
			where: {
				id,
			},
		});

		if (!order) {
			return NextResponse.json(
				formatResponse({
					success: false,
					message: "Transaction not found",
					data: null,
				}),
				{ status: 404 },
			);
		}

		const updatedOrder = await prisma.transaction.update({
			where: {
				id,
			},
			data: {
				status: isApproved ? "SUCCESS" : "FAILED",
			},
		});

		return NextResponse.json(
			formatResponse({
				success: true,
				message: "Transaction approved",
				data: {
					id: updatedOrder.id,
					status: updatedOrder.status,
				},
			}),
		);
	} catch (error) {
		console.log(error);

		return NextResponse.json(
			formatResponse({
				success: false,
				message: "Internal Server Error",
				data: null,
			}),
			{ status: 500 },
		);
	}
}
