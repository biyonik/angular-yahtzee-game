import {
  Component,
  computed,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'rule-row',
  standalone: true,
  imports: [],
  template: `
    <tr [class]="classComputed()" (click)="doScoreHandler(this.scoreName())">
      <td class="RuleRow-name">{{ name() }}</td>
      <td class="RuleRow-score">{{ scoreDisplay() }}</td>
    </tr>
  `,
  styles: [
    `
      .RuleRow {
        transition: all 0.2s;
      }
      .RuleRow-active:hover {
        cursor: pointer;
        background: rgba(227, 242, 253, 0.5);
      }

      .RuleRow-disabled {
        background: linear-gradient(
          to right,
          rgba(209, 196, 233, 1) 0%,
          rgba(209, 196, 233, 1) 0%,
          rgba(209, 196, 233, 1) 30%,
          rgba(227, 242, 253, 1) 40%
        );
        background-size: 300% 300%;
        animation: Slide 1s ease 1;
      }

      @keyframes Slide {
        0% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 51%;
        }
      }
      .RuleRow-disabled td:first-child {
        text-decoration: line-through;
      }

      .RuleRow-disabled:hover {
        cursor: not-allowed;
      }

      .RuleRow td {
        padding: 1em;
        border-bottom: solid 1px black;
      }

      .RuleRow-name {
        width: 100vw;
        text-align: left;
      }

      .RuleRow-score {
        width: 25%;
        text-align: right;
      }
    `,
  ],
})
export default class RuleRowComponent implements OnInit {
  name = input.required<string>();
  score = input.required<number | undefined>();
  scoreName = input.required<string>();
  description = input.required<string>();

  doScore = output<any>();

  scoreNameComputed = computed(() => this.score()!.toString());

  disabledComputed = computed(() => this.score() !== undefined);

  classComputed = computed(() => {
    return this.disabledComputed()
      ? 'RuleRow RuleRow-disabled'
      : 'RuleRow RuleRow-active';
  });

  scoreDisplay = computed(() =>
    this.disabledComputed() ? this.score() : this.description()
  );

  constructor() {}

  ngOnInit(): void {}

  doScoreHandler(type: string) {
    if (this.disabledComputed()) return;
    this.doScore.emit(type);
  }
}
