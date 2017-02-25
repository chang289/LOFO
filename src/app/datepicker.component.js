import { Component } from '@angular/core';

@Component({
	selector: 'ng2-datepicker',
	template: `
    <ng2-datepicker [(ngModel)]="date"></ng2-datepicker>
    Selected date is: {{ date }}
  `
})

export class DatePicker {
	
}