import { SessionUser } from "../interfaces";

const SESSION_KEY = "session";

export const setSession = (sessionUser: SessionUser): void => {
	sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
};

export const getSession = (): SessionUser => {
	const session = sessionStorage.getItem(SESSION_KEY);
	if (session) {
		return JSON.parse(session);
	} else {
		throw new Error("Session is undefined!");
	}
};

export const destroySession = (): void => {
	sessionStorage.removeItem(SESSION_KEY);
};

export const hasActiveSession = (): boolean => {
	return sessionStorage.getItem(SESSION_KEY) != null;
};
