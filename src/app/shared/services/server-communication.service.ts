import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { IAppointmentDB } from '../models/calendar.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ServerCommunicationService {

  private appointments: IAppointmentDB[] = [
    { id: 1, date: '2017-12-14', title: 'Gama Academy' },
    { id: 2, date: '2017-12-25', title: 'Christmas'    },
    { id: 3, date: '2017-12-10', title: 'Avanade'      },
    { id: 4, date: '2017-12-02', title: 'Lollapalooza' },
    { id: 5, date: '2017-12-18', title: 'Never Forget' },
    { id: 6, date: '2017-12-22', title: 'Lorem Ipsum'  }
  ];

  constructor(private http: Http) { }

  public getRequest(url: string): Observable<any> {
    return Observable.of(this.appointments);

    // For some reason I couldn't use the seed
    // Used /api/appointments and nothing comes out
    // return this.http.get(url)
    //   .map(res => res.json())
    //   .catch(this.handleError);
  }

  public postRequest(url: string, body: any): Observable<any> {

    // 
    // A little workaround to "save" the appointment
    this.appointments.push(<IAppointmentDB>body);

    return Observable.of(this.appointments);

    // For some reason I couldn't use the seed
    // Used /api/appointments and nothing comes out
    // return this.http.get(url)
    //   .map(res => res.json())
    //   .catch(this.handleError);
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error(error); // log to console instead
    return Observable.throw(error);
  }

}
