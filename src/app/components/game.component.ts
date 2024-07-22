import {
  Component,
  computed,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { GameState } from '../models/game.state.model';
import DiceComponent from './dice.component';
import ScoreTableComponent from './score-table.component';

@Component({
  selector: 'game',
  standalone: true,
  imports: [DiceComponent, ScoreTableComponent],
  template: `
    <div class="Game">
      <header class="Game-header">
        <h1 class="App-title">Yathzee!</h1>
        <section class="Game-dice-section">
          <dice
            [dice]="gameState().dice"
            [locked]="gameState().locked"
            (toggleLocked)="handleToggleLocked($event)"
          />
          <div class="Game-button-wrapper">
            <button
              class="Game-reroll"
              (click)="handleRoll()"
              [disabled]="buttonDisabledComputed()"
            >
              {{ gameState().rollsLeft }} Rerolls Left
            </button>
          </div>
        </section>
      </header>
      <score-table
        [scores]="gameState().scores"
        (doScore)="this.doScore($event)"
      />
    </div>
  `,
  styles: [
    `
      .Game {
        width: calc(65vw - 2em) !important;
        background: white;
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
          0 15px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      h2 {
        font-weight: 100;
        font-size: 2em;
        border-bottom: 2px solid purple;
        display: inline-block;
      }
      .Game-dice-section {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
      }

      .Game-button-wrapper {
        margin: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .Game-reroll {
        font-size: 2em;
        color: white;
        font-weight: 100;
        transition: 0.5s;
        background-size: 200% auto;
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
          0 15px 12px rgba(0, 0, 0, 0.1);
        background-image: linear-gradient(
          to right,
          #91eae4 0%,
          #7f7fd5 51%,
          #91eae4 100%
        );
        border-radius: 0.5rem;
        border: none;
        width: 50%;

        margin-bottom: 2rem;
      }

      .Game-reroll:hover {
        cursor: pointer;
        background-position: right center;
      }

      .Game-reroll:active,
      .Game-reroll:focus {
        outline: none;
      }

      .Game-reroll:disabled {
        background-color: #ddd;
        cursor: not-allowed;
        opacity: 0.5;
      }

      .Game-description {
        font-style: italic;
        color: white;
      }

      .Game-header {
        width: 100%;
        background: linear-gradient(-45deg, #673ab7, #9c27b0);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
      }

      @keyframes Gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,
  ],
})
export default class GameComponent implements OnInit {
  private readonly gameStateSignal: WritableSignal<GameState> =
    signal<GameState>({
      dice: [],
      locked: [],
      rollsLeft: 3,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    });

  gameState = this.gameStateSignal.asReadonly();

  protected readonly selectedRuleSignal: WritableSignal<string | null> = signal<
    string | null
  >(null);

  selectedRule = this.selectedRuleSignal.asReadonly();

  constructor() {
    effect(() => this.generateDice(), {
      allowSignalWrites: true,
    });

    effect(
      () =>
        this.gameStateSignal.update((state) => ({
          ...state,
          locked: Array(5).fill(false),
        })),
      {
        allowSignalWrites: true,
      }
    );
  }

  ngOnInit(): void { }

  buttonDisabledComputed = computed(
    () =>
      this.gameState().locked.every((x) => x) ||
      this.gameState().rollsLeft === 0
  );

  private generateDice() {
    const dice = Array(5)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    this.gameStateSignal.update((state) => ({ ...state, dice }));
  }

  handleToggleLocked(idx: number) {
    this.gameStateSignal.update((state) => ({
      ...state,
      locked: [
        ...state.locked.slice(0, idx),
        !state.locked[idx],
        ...state.locked.slice(idx + 1),
      ],
    }));
  }

  handleRoll() {
    this.gameStateSignal.update((state) => ({
      dice: state.dice.map((die, idx) => (state.locked[idx] ? die : Math.ceil(Math.random() * 6))),
      locked: state.rollsLeft > 1 ? state.locked : Array(5).fill(true),
      rollsLeft: state.rollsLeft - 1,
      scores: state.scores,
    }))
  }

  async doScore(rulename: string) {
    const ruleFn = await this.ruleFn(rulename);
    this.gameStateSignal.update((state) => ({
      ...state,
      scores: {
        ...state.scores,
        [rulename]: ruleFn.evalRoll(this.gameState().dice),
      },
      rollsLeft: state.rollsLeft > 0 ? state.rollsLeft - 1 : 0,
      locked: Array(5).fill(false),
    }));
  }

  private ruleFn = async (rulename: string) => {
    const { default: ruleFn } = await import(`../utils/Rule`);
    return ruleFn[rulename as keyof typeof ruleFn];
  };
}
