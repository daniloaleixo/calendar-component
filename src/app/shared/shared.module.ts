import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components 
import { CalendarComponent } from './components/calendar/calendar.component';

// Services
import { ServerCommunicationService } from './services/server-communication.service';
import { UtilsService } from './services/utils.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  providers: [
  	ServerCommunicationService,
  	UtilsService
  ]
})
export class SharedModule { }
