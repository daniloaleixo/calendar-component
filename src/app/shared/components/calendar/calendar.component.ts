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

  constructor() { }

  ngOnInit() {
  }

}
