import { Component, input, output } from "@angular/core";
import { Scores } from "../models/game.state.model";
import RuleRowComponent from "./rule-row.component";

@Component({
  selector: 'score-table',
  standalone: true,
  imports: [RuleRowComponent],
  template: `
    <section class="ScoreTable-section ScoreTable-section-lower">
      <h2>Lower</h2>
      <table cellSpacing="0">
        <tbody>
          <rule-row
            [name]="'Three Of A Kind'"
            [score]="scores().threeOfKind"
            (doScore)="doScoreHandler($event)"
          />
        </tbody>
      </table>
    </section>
  `,
  styles: [``]
})
export default class ScoreTableComponent {
  scores = input.required<Scores>();

  doScore = output<any>();

  constructor() { }

  doScoreHandler(type: string) {
    this.doScore.emit(type)
  }
}
