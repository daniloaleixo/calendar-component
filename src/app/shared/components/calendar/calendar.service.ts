import { Injectable } from '@angular/core';
import { ICalendarDay } from '../../models/calendar.model';

// Não fiz esse componente global porque ele vai servir de helper para o componente apenas
@Injectable()
export class CalendarService {

    constructor() { }


  	public mountMonthInformation(today: Date): Array<ICalendarDay[]> {
  		let result: Array<ICalendarDay[]> = [];
  		let month: ICalendarDay[] = this.getDaysInMonth(today.getMonth(), today.getFullYear())
  		.map((day: Date) => {
  			return {
  				date: day,
  				offset: false
  			};
  		});

  		month = this.addOffsetDays(month);

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

   	private getDaysInMonth(month: number, year: number): Date[] {
         const date = new Date(year, month, 1);
         let days = [];
         while (date.getMonth() === month) {
             days.push(new Date(date));
             date.setDate(date.getDate() + 1);
         }
         return days;
  	}

  	// Vai adicionar os dias que faltam nas colunas de inicio e fim
  	private addOffsetDays(month: ICalendarDay[]): ICalendarDay[] {
  		const lastDay: ICalendarDay = month[month.length - 1];

  		// Offset in the beggining 
  		// While it's not sunday
  		while(month[0].date.getDay() > 0) {
  			let newDay: ICalendarDay = {
  				offset: true,
  				date: this.previousDay(month[0].date)
  			}
  			month = [newDay, ...month];
  		}

  		// Offset in the end
  		// While it's not saturday
  		while(month[month.length - 1].date.getDay() < 6) {
  			let newDay: ICalendarDay = {
  				offset: true,
  				date: this.followingDay(month[month.length - 1].date)
  			}
  			month = [...month, newDay];
  		}

  		return month;
  	}



  	private previousDay(date: Date): Date {
  		return new Date(+date - 1000*60*60*24)
  	}
  	private followingDay(date: Date): Date {
  		return new Date(+date + 1000*60*60*24)
  	}
}
