import { Component, computed, input, output } from '@angular/core';
import { Scores } from '../models/game.state.model';
import RuleRowComponent from './rule-row.component';

@Component({
  selector: 'score-table',
  standalone: true,
  imports: [RuleRowComponent],
  template: `
    <div class="ScoreTable">
      <section class="ScoreTable-section">
        <h2>Upper</h2>
        <table cellSpacing="0">
          <tbody>
            <rule-row
              [name]="'Ones'"
              [score]="scores().ones"
              [scoreName]="'ones'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Twos'"
              [score]="scores().twos"
              [scoreName]="'twos'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Threes'"
              [score]="scores().threes"
              [scoreName]="'threes'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Fours'"
              [score]="scores().fours"
              [scoreName]="'fours'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Fives'"
              [score]="scores().fives"
              [scoreName]="'fives'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Sixes'"
              [score]="scores().sixes"
              [scoreName]="'sixes'"
              (doScore)="doScoreHandler($event)"
            />

          </tbody>
        </table>
      </section>

      <section className="ScoreTable-section ScoreTable-section-lower">
        <h2>Lower</h2>
        <table cellSpacing="0">
          <tbody>
            <rule-row
              [name]="'Three Of A Kind'"
              [score]="scores().threeOfKind"
              [scoreName]="'threeOfKind'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Four Of A Kind'"
              [score]="scores().fourOfKind"
              [scoreName]="'fourOfKind'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Full House'"
              [score]="scores().fullHouse"
              [scoreName]="'fullHouse'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Small Straight'"
              [score]="scores().smallStraight"
              [scoreName]="'smallStraight'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Large Straight'"
              [score]="scores().largeStraight"
              [scoreName]="'largeStraight'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Yahtzee'"
              [score]="scores().yahtzee"
              [scoreName]="'yahtzee'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Chance'"
              [score]="scores().chance"
              [scoreName]="'chance'"
              (doScore)="doScoreHandler($event)"
            />
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [
    `
      .ScoreTable {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        background-color: white;
        padding: 1em;
      }

      .ScoreTable table {
        width: 100%;
        margin: 0 auto;
        min-width: 400px;
      }

      .ScoreTable-section {
        vertical-align: top;
        width: 100%;
      }
    `,
  ],
})
export default class ScoreTableComponent {
  scores = input.required<Scores>();

  doScore = output<any>();

  constructor() { }

  doScoreHandler(type: string) {
    this.doScore.emit(type);
  }
}
