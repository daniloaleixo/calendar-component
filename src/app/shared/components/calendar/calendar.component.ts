import { Component, OnInit } from '@angular/core';


// 
// Decidi separar o componente calendar e coloca-lo dentro de um module shared, 
// porque muito provavelmemente o componente sera utilizado em outras partes do projeto
// 
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

	public today: Date;
	public daysOfTheWeek: string[];
	public month: Array<ICalendarDay[]>; 

  	constructor() {
  		this.today = new Date(2017, 11, 18); // Dia padrão requisitado
  		this.daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  		this.month = this.mountMonthInformation(this.today);
  	}

  	ngOnInit() {
  	}


  	// Move to service
  	private getDaysInMonth(month: number, year: number): Date[] {
        const date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
 	}
 	private mountMonthInformation(today: Date): Array<ICalendarDay[]> {
 		let result: Array<ICalendarDay[]> = [];
 		const month: ICalendarDay[] = this.getDaysInMonth(today.getMonth(), today.getFullYear())
 		.map((day: Date) => {
 			return {
 				date: day,
 				offset: false
 			};
 		});

 		// Divide the days in arrays of 7 so instead of a array(31) I would have 
 		// [ array(7), array (7), ...]
 		for(let i = 0; i < month.length; i+= 7) {
 			result.push([]);
 			for(let j = 0; j < 7; j++) {
 				if(i + j < month.length)
 					result[result.length - 1].push(month[i + j])
 			}
 		}

 		return result;
 	}

}

interface ICalendarDay {
	date: Date;
	offset: boolean;
}
