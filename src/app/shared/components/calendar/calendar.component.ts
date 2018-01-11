import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service'
import { ICalendarDay, IAppointment, IAppointmentDB } from '../../models/calendar.model';

import { ServerCommunicationService } from '../../services/server-communication.service';
import { UtilsService } from '../../services/utils.service';
import { COMM_CONSTANTS, DAYS_WEEK, DAYS_WEEK_FULL, MONTHS } from '../../constants/barrel-constants';

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

	// Constants
	public daysOfTheWeek: string[] = DAYS_WEEK;
	public daysOfTheWeekFull: string[] = DAYS_WEEK_FULL;
	public allMonths: string[] = MONTHS;

	// Later we could implement a loading component
    public loadingState: boolean = false;

    // Input that handles appointment creation
    public eventInput: string = '';


    // Month that is showed in our calendar
	public month: Array<ICalendarDay[]>;
	public selectedDay: ICalendarDay;
	public appointments: IAppointment[] = [];


  	constructor(private calendarService: CalendarService,
  				private utils: UtilsService,
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

	  		// Turns off loading 
	  		this.loadingState = true; 
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

  	public addEvent(title: string): void {
  		const appoint: IAppointment = {
  			title: title,
  			id: parseInt((Math.random()* 1000).toString()), //In fact it should be a UID
  			date: this.selectedDay.date 

  		};


  		// Here I'm just handling if there's an error uploading the event
  		// and some workaround to simulate the save on the DB
  		this.server.postRequest(COMM_CONSTANTS.addAppointment, {
  			...appoint,
  			date: this.calendarService.turnDateIntoDBDate(this.selectedDay.date),
  		})
  		.subscribe(
	  		(res) => {
	  			this.selectedDay.appointments.push(appoint);
	  			this.eventInput = ''; // Reset event input
	  		},
	  		(err) => {
	  			throw "Erro ao colocar o evento";
	  		}
  		);
  	}



  	public isSelectedDay(day: ICalendarDay): boolean {
  		if(!this.selectedDay) return false;
  		return day.date.getTime() == this.selectedDay.date.getTime();
  	}



  	public getFollowingMonth(): void {
  		this.selectedDay.date = this.utils.getFollowingMonth(this.selectedDay.date);
  		this.month = this.calendarService.mountMonthInformation(this.selectedDay.date, this.appointments);
  	}

  	public getPreviousMonth(): void {
  		this.selectedDay.date = this.utils.getPreviousMonth(this.selectedDay.date);
  		this.month = this.calendarService.mountMonthInformation(this.selectedDay.date, this.appointments);
  	}

}