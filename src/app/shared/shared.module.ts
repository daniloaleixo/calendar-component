import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class SharedModule { }
