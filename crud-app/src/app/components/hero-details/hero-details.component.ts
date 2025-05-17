import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero-service.service';
import { Hero } from '../../interfaces/hero';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-details',
  imports: [NgIf, FormsModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
})
export class HeroDetailsComponent {
  id?: number; //route parameter
  hero?: Hero;
  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService
  ) {}
  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(this.id).subscribe((val) => {
      console.log(val);
      this.hero = val;
    });
  }
}
