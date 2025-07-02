export type SessionPayload = {
	id: string;
	expiresAt: Date;
};

export type SessionType = "MANAGER" | "PATIENT";
