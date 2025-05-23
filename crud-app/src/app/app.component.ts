import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroService } from './services/hero-service.service';
import { Hero } from './interfaces/hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor() {}
  ngOnInit() {}
}
