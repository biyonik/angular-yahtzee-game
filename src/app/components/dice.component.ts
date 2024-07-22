import { Component, input, InputSignal, OnInit, output } from "@angular/core";
import DieComponent from "./die.component";

@Component({
  selector: 'dice',
  standalone: true,
  imports: [DieComponent],
  template: `
    @for (d of dice(); track $index) {
      <die
        [val]="d"
        [idx]="$index"
        [locked]="locked()[$index]"
        (toggleLocked)="toggleLocked.emit($index)"
      />
    }
  `,
  styles: [``]
})
export default class DiceComponent implements OnInit {
  dice: InputSignal<any> = input.required<any>();
  locked: InputSignal<boolean[]> = input.required<boolean[]>();

  toggleLocked = output<number>();


  constructor() { }

  ngOnInit(): void { }
}
