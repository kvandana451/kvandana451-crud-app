import { Component } from '@angular/core';
import { HeroService } from '../../services/hero-service.service';
import { Hero } from '../../interfaces/hero';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  imports: [NgFor, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {
  heroes?: Hero[];
  constructor(private heroService: HeroService) {}
  ngOnInit() {
    this.heroService.getHeroes().subscribe((value: any) => {
      console.log(value);
      this.heroes = value;
    });
  }
}
