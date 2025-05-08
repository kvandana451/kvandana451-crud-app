import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

interface Hero {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ];
    return { heroes };
  }

  // If the heroes array is empty,the method below returns the initial number which is 11.
  //  if the heroes array is not empty, the method below returns the highest hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length
      ? Math.max(...heroes.map((hero: Hero) => hero.id)) + 1
      : 11;
  }
}
