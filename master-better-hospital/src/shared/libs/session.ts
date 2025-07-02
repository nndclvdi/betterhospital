import "server-only";

import { jwtVerify, SignJWT } from "jose";
import type { SessionPayload, SessionType } from "../types/auth";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { SESSION_DETAIL } from "../constants/session";
import prisma from "./prisma";

const secretKey = process.env.SESSION_SECRET ?? "";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("3d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});

		return payload;
	} catch (error) {
		console.log("Failed to verify session");
	}
}

export async function createSession(
	userId: string,
	sessionType: SessionType = "MANAGER",
) {
	const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ id: userId, expiresAt });
	const cookieStore = await cookies();

	cookieStore.set(SESSION_DETAIL[sessionType].name, session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: SESSION_DETAIL[sessionType].path,
	});
}

export const verifySession = cache(async (type: SessionType = "MANAGER") => {
	const cookie = (await cookies()).get(SESSION_DETAIL[type].name)?.value;
	const session = (await decrypt(cookie)) as SessionPayload;

	if (!session) {
		return redirect(SESSION_DETAIL[type].redirect);
	}

	return { isAuthed: true, userId: session.id };
});

export async function deleteSession(type: SessionType = "MANAGER") {
	const cookieStore = await cookies();

	cookieStore.delete(SESSION_DETAIL[type].name);
}

export const getUser = cache(async (type: SessionType = "MANAGER") => {
	const session = await verifySession(type);
	if (!session) {
		return null;
	}

	try {
		const user = await prisma.user.findFirst({
			where: {
				id: session.userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				photo: true,
				gender: true
			},
		});

		return user;
	} catch (error) {
		console.log("Failed to fetch user");
		return null;
	}
});
