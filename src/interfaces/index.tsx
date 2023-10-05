export interface User {
	email: string;
	password: string;
}

export interface Pagination {
	page: number;
	perPage: number;
}

export interface SessionUser {
	id: number;
	userType: string;
}

export interface ControlledUser {
	id: number;
	name: string;
	email: string;
	password: string;
	salary: number;
	jobDescription: string;
	active: boolean;
	job: Job | undefined;
	schedules: Schedule[] | undefined;
}

export interface Job {
	id: number;
	name: string;
	area: string;
}

export interface Schedule {
	id: number;
	entryDay: Day;
	entryTime: string;
	exitDay: Day;
	exitTime: string;
}

export interface Day {
	id: number;
	name: string;
}
