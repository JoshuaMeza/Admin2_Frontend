export interface User {
	email: string;
	password: string;
}

export interface SessionUser {
	id: number;
	userType: string;
}
