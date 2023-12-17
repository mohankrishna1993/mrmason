import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
  animations: [
    trigger('startTypewriter', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        animate('2s ease-in')
      ])
    ])
  ]
})
export class Home1Component {

}
