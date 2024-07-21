import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>{{ title() }}</h1>
  `,
  styles: [`

  `]
})
export class AppComponent {
  titleSignal = signal<string>('Yathzee Game');
  title = this.titleSignal.asReadonly();
}
