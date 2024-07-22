import { Component, computed, input, OnInit, output } from "@angular/core";

@Component({
  selector: 'rule-row',
  standalone: true,
  imports: [],
  template: `
    <tr class="RuleRow RuleRow-active" (click)="doScoreHandler(this.scoreNameComputed())">
      <td class="RuleRow-name">{{name()}}</td>
      <td class="RuleRow-score">{{score()}}</td>
    </tr>
  `,
  styles: [``]
})
export default class RuleRowComponent implements OnInit {
  name = input.required<string>();
  score = input.required<number | undefined>();

  doScore = output<any>();

  scoreNameComputed = computed(() => this.score()!.toString());


  constructor() { }

  ngOnInit(): void { }

  doScoreHandler(type: string) {
    this.doScore.emit(type)
  }
}
