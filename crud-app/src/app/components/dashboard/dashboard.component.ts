import { Component } from '@angular/core';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../../services/hero-service.service';
import { Hero } from '../../interfaces/hero';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeroSearchComponent, RouterLink, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  topHeroes?: Hero[];
  constructor(private heroService: HeroService) {}
  ngOnInit() {
    this.heroService.getHeroes().subscribe((data) => {
      this.topHeroes = data.slice(0, 5);
    });
  }
}
