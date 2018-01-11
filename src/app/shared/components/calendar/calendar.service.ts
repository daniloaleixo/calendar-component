import { Injectable } from '@angular/core';
import { ICalendarDay, IAppointment } from '../../models/calendar.model';
import { UtilsService } from '../../services/utils.service';

// Não fiz esse componente global porque ele vai servir de helper para o componente apenas
@Injectable()
export class CalendarService {

    constructor(private utils: UtilsService) { }

    public flattenArrayOfArrays(arrays: Array<ICalendarDay[]>): ICalendarDay[] {
      return [].concat.apply([], arrays);
    }

    public mountMonthInformation(today: Date, appointments: IAppointment[]): Array<ICalendarDay[]> {
      let result: Array<ICalendarDay[]> = [];
      let month: ICalendarDay[] = this.getDaysInMonth(today.getMonth(), today.getFullYear())
      .map((day: Date) => {
        return {
          date: day,
          offset: false,
          appointments: []
        };
      });

      // Add days from previous and next month that appears on calendar view
      month = this.addOffsetDays(month);
      // Add the appointments to the correct date
      month = this.insertAppointments(month, appointments);

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

    // Part of the workaround to "save" appointment to DB
    public turnDateIntoDBDate(date: Date): string {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }


    // 
    // Helpers for the service
    // 
     private getDaysInMonth(month: number, year: number): Date[] {
         const date = new Date(year, month, 1);
         let days = [];
         while (date.getMonth() === month) {
             days.push(new Date(date));
             date.setDate(date.getDate() + 1);
         }
         return days;
    }

    private insertAppointments(month: ICalendarDay[], appointments: IAppointment[]): ICalendarDay[] {
      appointments.map((appt: IAppointment) => {
        debugger
        // Push appointment to the right day
        const dayToInsert: ICalendarDay = month
        .find((day: ICalendarDay) => this.utils.compareDayMonthYear(day.date, appt.date));

        debugger

        if(dayToInsert)
          dayToInsert.appointments.push(appt);
      });
      return month;
    }

    // Vai adicionar os dias que faltam nas colunas de inicio e fim
    private addOffsetDays(month: ICalendarDay[]): ICalendarDay[] {
      const lastDay: ICalendarDay = month[month.length - 1];

      // Offset in the beggining 
      // While it's not sunday
      while(month[0].date.getDay() > 0) {
        let newDay: ICalendarDay = {
          offset: true,
          date: this.utils.previousDay(month[0].date)
        }
        month = [newDay, ...month];
      }

      // Offset in the end
      // While it's not saturday
      while(month[month.length - 1].date.getDay() < 6) {
        let newDay: ICalendarDay = {
          offset: true,
          date: this.utils.followingDay(month[month.length - 1].date)
        }
        month = [...month, newDay];
      }

      return month;
    }

}
