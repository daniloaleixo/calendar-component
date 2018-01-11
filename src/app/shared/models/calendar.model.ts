
export interface ICalendarDay {
	date: Date;
	offset: boolean;
}

export interface IAppointmentDB {
	id: number;
	date: string;
	title: string;
}

export interface IAppointment {
	id: number;
	date: Date;
	title: string;
}