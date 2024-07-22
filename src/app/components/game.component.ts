import { Component, computed, effect, OnInit, signal, WritableSignal } from "@angular/core";
import { GameState } from "../models/game.state.model";
import DiceComponent from "./dice.component";
import ScoreTableComponent from "./score-table.component";

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
              {{gameState().rollsLeft}} Rerolls Left
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
  styles: [``]
})
export default class GameComponent implements OnInit {
  private readonly gameStateSignal: WritableSignal<GameState> = signal<GameState>({
    dice: [],
    locked: [],
    rollsLeft: 3,
    scores: {
      ones: 0,
      twos: 0,
      threes: 0,
      fours: 0,
      fives: 0,
      sixes: 0,
      threeOfKind: 0,
      fourOfKind: 0,
      fullHouse: 0,
      smallStraight: 0,
      largeStraight: 0,
      yahtzee: 0,
      chance: 0
    }
  });

  gameState = this.gameStateSignal.asReadonly();

  protected readonly selectedRuleSignal: WritableSignal<string | null> = signal<string | null>(null);

  selectedRule = this.selectedRuleSignal.asReadonly();

  constructor() {
    effect(() => this.generateDice(), {
      allowSignalWrites: true
    });

    effect(() => this.gameStateSignal.update(state => ({ ...state, locked: Array(5).fill(false) })), {
      allowSignalWrites: true
    });
  }

  ngOnInit(): void { }

  buttonDisabledComputed = computed(() => this.gameState().locked.every(x => x) || this.gameState().rollsLeft === 0);

  private generateDice() {
    const dice = Array(5).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    this.gameStateSignal.update(state => ({ ...state, dice }));
  }

  handleToggleLocked(idx: number) {
    this.gameStateSignal.update(state => (
      {
        ...state,
        locked: [...state.locked.slice(0, idx),
        !state.locked[idx],
        ...state.locked.slice(idx + 1)]
      }
    ));
  }

  handleRoll() {
    if (this.gameState().rollsLeft > 0) {
      this.generateDice();
      this.gameStateSignal.update(state => ({ ...state, rollsLeft: state.rollsLeft - 1 }));
    } else {
      this.gameStateSignal.update(state => ({ ...state, locked: Array(5).fill(true) }));
    }
  }

  async doScore(rulename: string) {
    const ruleFn = await this.ruleFn(rulename);
    this.gameStateSignal.update(state => (
      {
        ...state,
        scores: {
          ...state.scores,
          [rulename]: ruleFn.evalRoll(this.gameState().dice),
        },
        rollsLeft: (state.rollsLeft > 0) ? state.rollsLeft - 1 : 0,
        locked: Array(5).fill(false)
      }
    ));
  }

  private ruleFn = async (rulename: string) => {
    const {default: ruleFn} = await import(`../utils/Rule`);
    return ruleFn[rulename as keyof typeof ruleFn];
  };
}
