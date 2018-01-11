import { Injectable } from '@angular/core';

// 
// Handle all helper functions that will be used throughout the code
// 

@Injectable()
export class UtilsService {

  	constructor() { }


	// 
	// Date helpers functions
	// 
	public previousDay(date: Date): Date {
		return new Date(+date - 1000*60*60*24)
	}

	public followingDay(date: Date): Date {
		return new Date(+date + 1000*60*60*24)
	}

	public getFollowingMonth(date: Date): Date {
	  let followingMonth: Date = new Date(date.getFullYear(), 
	                                      date.getMonth() + 1,
	                                      date.getDate());
	  // There's a chance of the following month does not have 31 days
	  // so we have to check if the month is + 2
	  if(followingMonth.getMonth() == date.getMonth() + 2)
	    followingMonth = this.getPreviousMonth(followingMonth);

	  if(followingMonth.getMonth() == date.getMonth())
	    throw "Nao consegui pegar o mês seguinte";

	  return followingMonth;
	}

	public getPreviousMonth(date: Date): Date {
	  let previousMonth: Date = new Date(date.getFullYear(), 
	                                      date.getMonth() - 1,
	                                      date.getDate());
	  // There's a chance of the previous month does not have 31 days
	  // so we have to get the previous day
	  if(previousMonth.getMonth() == date.getMonth())
	    previousMonth = this.getPreviousMonth(previousMonth);

	  if(previousMonth.getMonth() == date.getMonth())
	    throw "Nao consegui pegar o mês anterior";

	  return previousMonth;
	}


	public compareDayMonthYear(date1: Date, date2: Date): boolean {
	  return date1.getDate() == date2.getDate() && 
	          date1.getMonth() == date2.getMonth() &&
	          date1.getFullYear() == date2.getFullYear();
	}

}
