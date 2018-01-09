import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar.service'
import { ICalendarDay } from '../../models/calendar.model';

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

  	constructor(private calendarService: CalendarService) {}

  	ngOnInit() {
  		// Start selected date
  		const startDate: Date = new Date(2017, 11, 18)
  		
  		this.month = this.calendarService.mountMonthInformation(startDate);
  		this.changeSelectedDay(startDate);

  	}

  	public changeSelectedDay(daySelected: Date): void {
  		this.selectedDay = this.calendarService.flattenArrayOfArrays(this.month)
  							.find((day: ICalendarDay) => daySelected.getTime() == day.date.getTime());
  	}

  	public isSelectedDay(day: ICalendarDay): boolean {
  		if(!this.selectedDay) return false;
  		return day.date.getTime() == this.selectedDay.date.getTime();
  	}

}