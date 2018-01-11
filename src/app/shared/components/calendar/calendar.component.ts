import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service'
import { ICalendarDay, IAppointment, IAppointmentDB } from '../../models/calendar.model';

import { ServerCommunicationService } from '../../services/server-communication.service';
import { COMM_CONSTANTS } from '../../constants/communication.constant';

// 
// Decidi separar o componente calendar e coloca-lo dentro de um module shared, 
// porque muito provavelmemente o componente sera utilizado em outras partes do projeto
// 
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService]
})
export class CalendarComponent implements OnInit {

    public loadingState: boolean = false;

	public daysOfTheWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	public daysOfTheWeekFull: string[] = ['Sunday', 'Monday', 
									'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	public allMonths: string[] = ['January',
								'February',
								'March',
								'April',
								'May',
								'June',
								'July',
								'August',
								'September',
								'October',
								'November',
								'December']

	public month: Array<ICalendarDay[]>;
	public selectedDay: ICalendarDay;

	public appointments: IAppointment[] = [];

  	constructor(private calendarService: CalendarService,
  				private server: ServerCommunicationService) {}

  	ngOnInit() {
  		// Start selected date
  		const startDate: ICalendarDay = {
  			date: new Date(2017, 11, 18),
  			offset: false
  		};

  		// Request from server
  		this.server.getRequest(COMM_CONSTANTS.getAppointments)
  		.subscribe((res: IAppointmentDB[]) => {
  			// Get all the appointments for this user
  			this.appointments = res.map((appt: IAppointmentDB) => {
  				return { ...appt, date: new Date(appt.date) };
  			});

  			// Create the month object with all the appointments 
	  		this.month = this.calendarService.mountMonthInformation(startDate.date, this.appointments);
	  		this.changeSelectedDay(startDate);
	  		this.loadingState = true;
	  		console.log(this.month);
  		});
  	}

  	public changeSelectedDay(daySelected: ICalendarDay): void {
  		// If day is offset I have to also change the month
  		if(daySelected.offset) {
  			// If offset represents previous month
  			if((daySelected.date.getMonth() + 1) % 12 == this.selectedDay.date.getMonth())
  				this.getPreviousMonth();
  			// If offset represents the next month
  			else if((daySelected.date.getMonth() - 1) % 12 == this.selectedDay.date.getMonth())
  				this.getFollowingMonth();
  		}

  		this.selectedDay = this.calendarService.flattenArrayOfArrays(this.month)
  							.find((day: ICalendarDay) => daySelected.date.getTime() == day.date.getTime());
  	}



  	public isSelectedDay(day: ICalendarDay): boolean {
  		if(!this.selectedDay) return false;
  		return day.date.getTime() == this.selectedDay.date.getTime();
  	}



  	public getFollowingMonth(): void {
  		this.selectedDay.date = this.calendarService.getFollowingMonth(this.selectedDay.date);
  		this.month = this.calendarService.mountMonthInformation(this.selectedDay.date, this.appointments);
  	}

  	public getPreviousMonth(): void {
  		this.selectedDay.date = this.calendarService.getPreviousMonth(this.selectedDay.date);
  		this.month = this.calendarService.mountMonthInformation(this.selectedDay.date, this.appointments);
  	}

}