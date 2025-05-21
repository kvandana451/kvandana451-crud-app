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
  addHero(ele: any) {
    let name = ele.value;
    ele.value = '';
    if (!name) {
      return;
    }
    name = name.trim();
    console.log(name);
    this.heroService.addHero({ name }).subscribe((hero: any) => {
      this.getHeroes();
    });
  }
  delete(hero: Hero) {
    // server returns null if data is successfully deleted
    this.heroService.deleteHero(hero).subscribe((failedData: Hero) => {
      console.log(failedData);
      this.getHeroes();
    });
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe((value) => {
      this.heroes = value;
    });
  }
  ngOnInit() {
    this.getHeroes();
  }
}
