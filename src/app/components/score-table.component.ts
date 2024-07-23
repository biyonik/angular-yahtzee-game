import { Component, computed, input, output } from '@angular/core';
import { Scores } from '../models/game.state.model';
import RuleRowComponent from './rule-row.component';

@Component({
  selector: 'score-table',
  standalone: true,
  imports: [RuleRowComponent],
  template: `
    <div class="ScoreTable">
      <div class="TotalScore">
        <h2>Total Score: {{ totalScore() }}</h2>
      </div>
      <section class="ScoreTable-section">
        <h2>Upper</h2>
        <table cellSpacing="0">
          <tbody>
            <rule-row
              [name]="'Ones'"
              [score]="scores().ones"
              [scoreName]="'ones'"
              [description]="'1 point per 1'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Twos'"
              [score]="scores().twos"
              [scoreName]="'twos'"
              [description]="'2 points per 2'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Threes'"
              [score]="scores().threes"
              [scoreName]="'threes'"
              [description]="'3 points per 3'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Fours'"
              [score]="scores().fours"
              [scoreName]="'fours'"
              [description]="'4 points per 4'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Fives'"
              [score]="scores().fives"
              [scoreName]="'fives'"
              [description]="'5 points per 5'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Sixes'"
              [score]="scores().sixes"
              [scoreName]="'sixes'"
              [description]="'6 points per 6'"
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
              [description]="'Sum all dice if 3 are the same'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Four Of A Kind'"
              [score]="scores().fourOfKind"
              [scoreName]="'fourOfKind'"
              [description]="'Sum all dice if 4 are the same'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Full House'"
              [score]="scores().fullHouse"
              [scoreName]="'fullHouse'"
              [description]="'25 points for a full house'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Small Straight'"
              [score]="scores().smallStraight"
              [scoreName]="'smallStraight'"
              [description]="'30 points for a small straight'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Large Straight'"
              [score]="scores().largeStraight"
              [scoreName]="'largeStraight'"
              [description]="'40 points for a large straight'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Yahtzee'"
              [score]="scores().yahtzee"
              [scoreName]="'yahtzee'"
              [description]="'50 points for yahtzee'"
              (doScore)="doScoreHandler($event)"
            />

            <rule-row
              [name]="'Chance'"
              [score]="scores().chance"
              [scoreName]="'chance'"
              [description]="'Sum of all dice'"
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
        border: 1px dashed #ddd;
        padding: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .ScoreTable-section {
        vertical-align: top;
        width: 100%;
      }

      .TotalScore {
        text-align: center;
        margin-bottom: 1em;
        background: linear-gradient(to right, #ff416c, #7f7fd5);
        padding: 1em;
        border: none;
        border-radius: 4px;
        color: white;
      }
    `,
  ],
})
export default class ScoreTableComponent {
  scores = input.required<Scores>();
  totalScore = input.required<number | undefined>();

  doScore = output<any>();

  constructor() {}

  doScoreHandler(type: string) {
    this.doScore.emit(type);
  }
}
