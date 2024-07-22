import {
  Component,
  computed,
  effect,
  input,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

const numberWords = ['one', 'two', 'three', 'four', 'five', 'six'];

@Component({
  selector: 'die',
  standalone: true,
  imports: [],
  template: `
    <button
      [class]="computedButtonClass()"
      (click)="this.toggleLocked.emit(idx())"
      [disabled]="disabled()"
    >
      <i [class]="computedDieClass()"></i>
    </button>
  `,
  styles: [
    `
      .Die {
        color: white;
        text-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
          0 15px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        margin: 1rem;
        border: none;
        background: none;

        &-locked {
          opacity: 0.5;
          text-shadow: none;
        }

        &:not(.Die-locked):hover {
          cursor: pointer;
          opacity: 0.8;
        }

        &-rolling {
          animation: spin 1s ease-out;
        }

        &-rolling:hover,
        &[disabled] {
          cursor: not-allowed;
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export default class DieComponent implements OnInit {
  val = input.required<number>();
  locked = input<boolean>();
  idx = input.required<number>();
  rolling = input<boolean>();
  disabled = input<boolean>();

  toggleLocked = output<number>();

  computedButtonClass = computed(() => {
    return `Die ${this.locked() ? 'Die-locked' : ''} ${this.rolling() ? 'Die-rolling' : ''
      }`;
  });

  computedDieClass = computed(
    () => `fas fa-dice-${numberWords[this.val() - 1]} fa-5x`
  );

  constructor() {
  }

  ngOnInit(): void { }
}
