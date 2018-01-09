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

	public today: Date;
	public daysOfTheWeek: string[];
	public month: Array<ICalendarDay[]>; 

  	constructor(private calendarService: CalendarService) {}

  	ngOnInit() {
  		this.today = new Date(2017, 11, 18); // Dia padrão requisitado
  		this.daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  		this.month = this.calendarService.mountMonthInformation(this.today);
  	}

}