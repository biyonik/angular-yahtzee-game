import { Component, input, OnInit, output } from "@angular/core";

@Component({
  selector: 'die',
  standalone: true,
  imports: [],
  template: `
    <button
      class="Die"
      (click)="this.toggleLocked.emit(idx())"
    >{{val()}}</button>
  `,
  styles: [``]
})
export default class DieComponent implements OnInit {
  val = input.required<number>();
  locked = input<boolean>();
  idx = input.required<number>();

  toggleLocked = output<number>();

  constructor() { }

  ngOnInit(): void { }
}
