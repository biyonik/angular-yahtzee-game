import { Component, signal } from '@angular/core';
import GameComponent from './components/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent],
  template: `
    <div class="App">
      <game />
    </div>
  `,
})
export class AppComponent {
  titleSignal = signal<string>('Yathzee Game');
  title = this.titleSignal.asReadonly();
}
