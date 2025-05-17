import { Routes } from '@angular/router';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { HeroesComponent } from './components/heroes/heroes.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero-details/:id', component: HeroDetailsComponent },
];
