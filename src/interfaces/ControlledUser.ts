export interface ControlledUser {
    id: number,
    name: string,
    email: string,
    password: string,
    is_active: boolean,
    salary: number,
    job_id: number
}
export interface Day {
    id: number,
    name: string
}

export interface Schedule {
    entryDay: Day,
    entryTime: string
    exitDay: Day,
    exitTime: string
}