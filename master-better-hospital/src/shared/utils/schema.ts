import { z } from "zod";

export const schemaApproval = z.object({
	id: z.string(),
	isApproved: z.boolean(),
});

export type ApprovalRequest = z.infer<typeof schemaApproval>;
