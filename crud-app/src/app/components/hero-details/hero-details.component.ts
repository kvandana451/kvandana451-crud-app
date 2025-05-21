import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private heroService: HeroService,
    private router: Router
  ) {}
  save(): void {
    if (this.hero)
      this.heroService.updateHero(this.hero).subscribe((value: Hero) => {
        console.log(value); //returns null
        // Because HttpClientInMemoryWebApiModule is a mock server, and:
        // It doesn’t always return the updated data properly.
        // By default, PUT() in this mock returns null
        this.goBack();
      });
  }
  goBack() {
    this.router.navigate(['/heroes']);
  }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.heroService.getHero(this.id).subscribe((value: Hero) => {
      console.log(value);
      this.hero = value;
    });
  }
}
